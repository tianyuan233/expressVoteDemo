const { Router } = require('express');
const router = Router();
const Vote = require('../controller/vote')
//用户页

router.route('/create')
  .get(Vote.showCreate)
  .post(Vote.create)

router.route('/:id')
  .get(Vote.showVoteById)
  .post(Vote.voteup)

router.route('/info/:id')
  .get(Vote.showVoteInfoById)

module.exports = router;