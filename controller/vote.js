const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const conn = require('../util/db')
const Vote = require('../module/vote')
const Option = require('../module/option')
const Choice = require('../module/choice')

exports.showCreate = function (req, res, next) {
  res.render('vote/create.pug')
}

exports.create = async function (req, res, next) {
  let voteInfo = req.body
  let userid = req.signedCookies.userid

  let vote = await Vote.create({
    title: voteInfo.title,
    desc: voteInfo.desc,
    userid: userid,
    singleSelection: voteInfo.singleSelection,
    anonymouse: voteInfo.anonymouse,
    deadline: new Date(voteInfo.deadline)
  })

  Promise.all(voteInfo.options.map(option => {
    return Option.create({
      content: option,
      voteid: vote.id
    })
  })).then(() => {
    res.redirect('/vote/' + vote.id)
  })
}

exports.showVoteById = async function (req, res, next) {
  let userid = req.signedCookies.userid
  if (!userid) {
    res.redirect(301, '/login')
  }

  let vote = await Vote.findByPk(req.params.id)
  let options = await Option.findAll({
    where: {
      voteid: req.params.id
    }
  })
  res.render('vote/vote.pug', {
    vote: vote,
    options: options
  })
}

exports.voteup = async function (req, res, next) {
  let userid = req.signedCookies.userid
  let voteid = req.body.voteid
  let optionid = req.body.optionid

  
  let voteupInfo = await Choice.findAndCountAll({
    where: {
      userid: userid,
      voteid: voteid
    }
  })
  
  if (voteupInfo.count === 0) {
    await Choice.create({
      userid: userid,
      voteid: voteid,
      optionid: optionid
    })
    
    
  } else {
    console.log("update");
    let updateRes = await Choice.update(
      { optionid: optionid },
      { where: { userid: userid, voteid: voteid, } }
      )
      console.log(updateRes);
      
    }
    io.in(`/vote/${voteid}`).emit('voteup', {
      userid,
      voteid,
      optionid
    })
    
    let allVoteData = await Choice.findAll({
      where: {
        voteid: voteid
    }
  })
  res.json(allVoteData)

}

exports.showVoteInfoById = async function (req, res, next) {
  let userid = req.signedCookies.userid
  let voteid = req.params.id

  let userVoteupInfo = await Choice.findOne({
    where: {
      userid: userid,
      voteid: voteid
    }
  })
  if (userVoteupInfo) {
    let voteups = await Choice.findAll({
      where: {
        voteid: voteid
      }
    })
    res.json(voteups)
  } else {
    res.json(null)
  }
}