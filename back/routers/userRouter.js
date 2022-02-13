const express = require("express");
const nodemailer = require("nodemailer");
const smtpPool = require("nodemailer-smtp-pool");
const db = require("../db");

const router = express.Router();

const smtpTransport = nodemailer.createTransport(
  smtpPool({
    service: "Gmail",
    host: "localhost",
    port: "465",
    tls: {
      rejectUnauthorize: false,
    },

    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
    maxConnections: 5,
    maxMessages: 10,
  })
);

// [POST] localhost:4000/api/user/checkEmail
router.post("/checkEmail", (req, res, next) => {
  const { email } = req.body;

  try {
    if (!email) {
      throw "이메일은 필수 입력값 입니다.";
    }

    const query1 = `
        SELECT	email
          FROM	users
         WHERE	email = "${email}"
    `;

    db.query(query1, async (err, rows) => {
      if (err) {
        console.error(err);
        throw "데이터베이스 쿼리 실행에 실패했습니다.";
      }

      if (rows.length === 0) {
        return res.status(200).send("등록되지 않은 회원입니다.");
      }

      // 그러면 이메일을 전송해보까요?

      const ran1 = Math.floor(Math.random() * 10);
      const ran2 = Math.floor(Math.random() * 10);
      const ran3 = Math.floor(Math.random() * 10);
      const ran4 = Math.floor(Math.random() * 10);

      const randomCode = "" + ran1 + ran2 + ran3 + ran4;

      const sendInfo = {
        from: "soyclub.com",
        to: email,
        subject: "🔐 SOYCLUB에서 보낸 보안코드 입니다.",
        html: `로그인에 필요한 보안코드는 <strong>${randomCode}</strong> 입니다.`,
      };

      await smtpTransport.sendMail(sendInfo, (err, info) => {
        if (err) {
          console.error(err);
        } else {
          console.log(info);
        }
      });

      const updateQuery = `
        UPDATE  users
           SET  secretCode = "${randomCode}"
         WHERE  email = "${email}"
      `;

      db.query(updateQuery, (err, rows) => {
        if (err) {
          console.error(err);
        } else {
          return res.status(200).send("SUCCESS");
        }
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send("오류가 발생했습니다.");
  }
});

router.post("/checkCode", (req, res, next) => {
  const { email, code } = req.body;

  const selectQuery = `
    SELECT  id,
            avatar,
            email,
            username,
            statusMsg
      FROM  users
     WHERE  email = "${email}"
       AND  secretCode = "${code}"
  `;

  try {
    db.query(selectQuery, (err, rows) => {
      if (err) {
        console.error(err);
        throw "서버장애가 발생했습니다. 잠시 후 다시 시도해주세요.";
      }

      if (rows.length === 1) {
        return res.status(200).json(rows[0]);
      } else {
        return res.status(200).json(null);
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send("잘못된 접근입니다. 다시 시도해주세요.");
  }
});

module.exports = router;
