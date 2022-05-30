const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../data');


// Get all members
router.get('/', (req, res) => {
  res.json(members);
});

// Get single member
router.get('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `Member with id of ${req.params.id} not found.` });
  }
});

// Create member
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name
  };
  if (!newMember.name) {
    return res.status(400).json({ msg: 'Please include a name' });
  }
  members.push(newMember);
  res.json(members);
});

// Update single member
router.put('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    const updateMember = req.body;
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;

        res.json({ msg: 'Member updated', member })
      }
    })
  } else {
    res.status(400).json({ msg: `Member with id of ${req.params.id} not found.` });
  }
});

// Delete single member
router.delete('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: 'Member deleted',
      members: members.filter(member => member.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `Member with id of ${req.params.id} not found.` });
  }
});


module.exports = router;
