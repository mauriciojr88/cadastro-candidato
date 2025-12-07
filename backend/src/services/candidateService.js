const result = await client.query(
    `INSERT INTO candidates
    (user_id, name, email, phone, cep, logradouro, bairro, cidade, uf, cv_text, file_name, file_size, file_mimetype)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
    RETURNING *`,
    [
      userId,
      extractedName,
      extractedEmail,
      extractedPhone,
      cep,
      logradouro,
      bairro,
      cidade,
      uf,
      text,
      file.originalname,
      file.size,
      file.mimetype
    ]
  );
  