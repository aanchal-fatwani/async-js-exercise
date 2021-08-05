const fs = require("fs");
const superagent = require("superagent");

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("Could not read file");
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write to file");
      resolve("success");
    });
  });
};

const getDogPic = async () => {
  console.log("2");
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log("4");
    console.log(`Breed: ${data}`);

    /////////////Single dog
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);
    await writeFilePromise("dog-img.txt", res.body.message);
    console.log("Random dog image saved to file!");

    /////////////Multiple dogs
    const resPromise1 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const resPromise2 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const resPromise3 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const allRes = await Promise.all([resPromise1, resPromise2, resPromise3]);
    const allImgs = allRes.map(res=> res.body.message)
    console.log(allImgs);

    await writeFilePromise("dog-img.txt", allImgs.join('\n'));
    console.log("Random dogs images saved to file!");
    
  } catch (err) {
    console.log(err.message || err);
    throw err.message || err;
  }
  return "Done..";
};

(async () => {
  try {
    console.log("1");
    const x = await getDogPic();
    console.log(x);

    console.log("5");
  } catch (err) {
    console.log("ERRRRRRRRRRR");
  }
})();

// console.log("1");
// const x = getDogPic()
//   .then((res) => {
//     console.log(5);
//     console.log(res);
//   })
//   .catch((err) => console.log("ERRRRRRRRRRR"));
// console.log(x);

console.log("3");

/////////////////////////// PROMISES
// readFilePromise(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePromise("dog-img.txt", res.body.message);
//   })
//   .then(() => console.log("Random dog image saved to file!"))
//   .catch((err) => {
//     console.log(err.message || err);
//   });

/////////////////////////// CALLBACKS
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);
//   //   superagent
//   //     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//   //     .end((err, res) => {
//   //       if (err) return console.log(err.message);
//   //       console.log(res.body.message);

//   //       fs.writeFile("dog-img.txt", res.body.message, (err) => {
//   //         console.log(err);
//   //       });
//   //     });
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);

//       fs.writeFile("dog-img.txt", res.body.message, (err) => {
//         if (err) return console.log(err);
//         console.log("Random dog image saved to file!");
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });
