const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Serve static files from the 'Tabs web' folder
app.use(express.static('Tabs web'));

let likesData = { post1: 0 };

if (fs.existsSync('likes.json')) {
  likesData = JSON.parse(fs.readFileSync('likes.json'));
}

app.get('/likes/:postId', (req, res) => {
  const postId = req.params.postId;
  res.json({ likes: likesData[postId] || 0 });
});

app.post('/likes/:postId', (req, res) => {
  const postId = req.params.postId;
  const action = req.body.action;

  if (action === 'like') {
    likesData[postId] = (likesData[postId] || 0) + 1;
  } else if (action === 'unlike') {
    likesData[postId] = Math.max(0, (likesData[postId] || 0) - 1);
  }

  fs.writeFileSync('likes.json', JSON.stringify(likesData));
  res.json({ likes: likesData[postId] });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
