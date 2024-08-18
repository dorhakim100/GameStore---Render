import { ObjectId } from 'mongodb'

import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
import { utilService } from '../../services/util.service.js'

export const gameService = {
  remove,
  query,
  getById,
  add,
  update,
  addGameMsg,
  removeGameMsg,
  queryReviews,
}

async function query(filterBy = { txt: '' }) {
  try {
    const PAGE_SIZE = 6 // 6 docs in single page
    let pageIdx
    console.log(filterBy)
    const criteria = {}
    let sort = {}
    let isOnlyInStock
    if (filterBy.inStock === 'onlyInStock') {
      isOnlyInStock = true
    } else {
      isOnlyInStock = false
    }
    if (isOnlyInStock) {
      criteria.inStock = { $eq: true }
    }
    if (filterBy.txt) {
      const regex = new RegExp(filterBy.txt, 'i')
      criteria.name = { $regex: regex }
    }
    console.log(filterBy)
    let price = filterBy.maxPrice
    if (filterBy.maxPrice) {
      price = +price
      criteria.price = { $lt: price }
    }
    if (filterBy.companies.length > 0) {
      criteria.companies = { $all: filterBy.companies }
    }
    if (filterBy.labels.length > 0) {
      criteria.labels = { $all: filterBy.labels }
    }
    if (filterBy.sortBy) {
      switch (filterBy.sortBy) {
        case 'NameDescending':
          sort.name = 1
          break
        case 'NameAscending':
          sort.name = -1
          break
        case 'PriceDescending':
          sort.price = -1
          break
        case 'PriceAscending':
          sort.price = 1
          break
      }
    }

    if (filterBy.pageIdx === undefined) {
      const collection = await dbService.getCollection('game')
      var games = await collection.find(criteria, { sort }).toArray()

      return games
    } else {
      pageIdx = filterBy.pageIdx // 3rd page
      pageIdx = +pageIdx
    }

    const collection = await dbService.getCollection('game')
    var games = await collection
      .find(criteria, { sort })
      .skip(PAGE_SIZE * pageIdx)
      .limit(PAGE_SIZE)
      .toArray()
    games.map((game) => {
      if (!game.createdAt) {
        game.createdAt = game._id.getTimestamp()
      }
    })
    if (filterBy.sortBy === 'TimeDescending') {
      sort.createdAt = 1

      games = await collection.find(criteria, { sort }).limit(6).toArray()
    } else if (filterBy.sortBy === 'TimeAscending') {
      sort.createdAt = -1
      games = await collection.find(criteria, { sort }).toArray()
    }

    return games
  } catch (err) {
    logger.error('cannot find games', err)
    throw err
  }
}

async function getById(gameId) {
  try {
    const collection = await dbService.getCollection('game')
    const game = await collection.findOne({
      _id: ObjectId.createFromHexString(gameId),
    })
    game.createdAt = game._id.getTimestamp()
    return game
  } catch (err) {
    logger.error(`while finding game ${gameId}`, err)
    throw err
  }
}

async function remove(gameId) {
  try {
    const collection = await dbService.getCollection('game')
    const { deletedCount } = await collection.deleteOne({
      _id: ObjectId.createFromHexString(gameId),
    })
    return deletedCount
  } catch (err) {
    logger.error(`cannot remove game ${gameId}`, err)
    throw err
  }
}

async function add(game) {
  try {
    const collection = await dbService.getCollection('game')
    await collection.insertOne(game)
    return game
  } catch (err) {
    logger.error('cannot insert game', err)
    throw err
  }
}

async function update(game) {
  try {
    console.log(game)
    const gameToSave = {
      name: game.name,
      price: game.price,
      labels: game.labels,
      inStock: game.inStock,
      companies: game.companies,
      cover: game.cover,
      preview: game.preview,
      reviews: game.reviews,
      msg: game.msgs,
    }
    const collection = await dbService.getCollection('game')
    await collection.updateOne(
      { _id: ObjectId.createFromHexString(game._id) },
      { $set: gameToSave }
    )
    return game
  } catch (err) {
    logger.error(`cannot update game ${game._id}`, err)
    throw err
  }
}

async function addGameMsg(gameId, msg) {
  try {
    console.log(gameId)
    msg.id = utilService.makeId()

    const collection = await dbService.getCollection('game')
    await collection.updateOne(
      { _id: ObjectId.createFromHexString(gameId) },
      // { $push: { msgs: msg } }
      { $push: { msgs: { $each: [msg], $position: 0 } } }
      // [
      //   {
      //     $set: {
      //       msgs: {
      //         $ifNull: [{ $concatArrays: ['$events', [msg]] }, [msg]],
      //       },
      //     },
      //   },
      // ]
    )
    return msg
  } catch (err) {
    logger.error(`cannot add game msg ${gameId}`, err)
    throw err
  }
}

async function removeGameMsg(gameId, msgId) {
  try {
    const collection = await dbService.getCollection('game')
    await collection.updateOne(
      { _id: ObjectId.createFromHexString(gameId) },
      { $pull: { msgs: { id: msgId } } }
    )
    return msgId
  } catch (err) {
    logger.error(`cannot add game msg ${gameId}`, err)
    throw err
  }
}

function _buildCriteria(filterBy) {
  const criteria = {}

  // if (filterBy.byUserId) {
  //   criteria.byUserId = ObjectId.createFromHexString(filterBy.byUserId)
  // }
  return criteria
}
// const res = await queryReviews()
// console.log(res)
async function queryReviews(filterBy = {}) {
  try {
    // const criteria = _buildCriteria(filterBy)
    const criteria = {}
    const collection = await dbService.getCollection('game')

    var reviews = await collection
      .aggregate([
        {
          $match: criteria,
        },
        {
          $lookup: {
            localField: 'reviews.fullName',
            from: 'user',
            foreignField: 'fullname',
            as: 'byUser',
          },
        },
        {
          $unwind: '$byUser',
        },
      ])
      .toArray()

    var reviewsContent = reviews.map((game) => {
      return {
        gameId: game._id,
        gameName: game.name,
        userName: game.byUser.fullname,
        reviewContent: game.reviews,
        gameCover: game.cover,
      }
    })

    return reviewsContent
  } catch (err) {
    logger.error(`while finding reviews`, err)
    throw err
  }

  // var reviews = await collection.aggregate([{}])
}
