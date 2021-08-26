const exxpress = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const fs = require("fs");

const app = exxpress();
app.use(require("express-status-monitor")());
// connectDB();

const PORT = process.env.PORT || 8080;

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.use(exxpress.json());
app.use(exxpress.urlencoded({ extended: true }));
const data = {
  courseDetails: {
    totalVideos: 6,
    name: "angular",
    details: [
      { title: "intro a", videos: ["first video", "second video"] },
      {
        title: "middle a",
        videos: ["third video", "furth video", "fifth video"],
      },
      { title: "final a", videos: ["sixth video"] },
    ],
  },
  userDetails: {
    watched: [true, false, false, false, false, false],
  },
};
app.get("/api/angular", (req, res) => {
  res.json({
    courseDetails: {
      totalVideos: 6,
      name: "angular",
      details: [
        {
          title: "intro a",
          videos: ["first video", "second video", "third video", "furth video"],
        },
        {
          title: "middle a",
          videos: ["fifth video", "sixth video"],
        },
        { title: "final a", videos: ["seventh video"] },
      ],
    },
    userDetails: {
      watched: [true, false, false, false, false, false],
    },
  });
});

data.courseDetails.details.map((e) =>
  e.videos.forEach((e2) => console.log(e2))
);
app.get("/api/angular/:num", (req, res) => {
  const range = req.headers.range;
  const number = req.params.num;
  console.log(number);
  if (!range) {
    res.status(400).send("requires range headers");
  }

  const videoPath = `${number}.mp4`;
  const videoSize = fs.statSync(`${number}.mp4`).size;

  const CHUNK_SIZE = 1 * 10 ** 4;
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);

  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.pipe(res);
});

app.get("/api/react", (req, res) => {
  res.json({
    react: [
      { title: "intro r", videos: ["first video", "second video"] },
      {
        title: "middle r",
        videos: ["first video", "second video", "third video"],
      },
      { title: "final r", videos: ["first video"] },
    ],
  });
});

app.listen(PORT, () => {
  console.log(`listing to port ${PORT}`);
});
