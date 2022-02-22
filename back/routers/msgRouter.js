const express = require("express");
const db = require("../db");

const router = express.Router();

router.post("/send", (req, res, next) => {
  const { toId, fromId, content } = req.body;

  const insertQuery = `
    INSERT INTO messages (
        content,
        fromUserId,
        toUserId,
        createdAt
    ) VALUES (
        "${content}",
        ${fromId},
        ${toId},
        NOW()
    )
  `;

  try {
    db.query(insertQuery, (error, rows) => {
      if (error) {
        throw "쿼리 실행 실패";
      }

      return res.status(201).send("1");
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send("쪽지 보내기에 실패했습니다.");
  }
});

module.exports = router;
