let fs = require("fs");
let path = require("path");
let Promise = require('./3.promise')

//const Promise = require("./../test");
// function ReadFile(filePath) {
//   return new Promise((resolve, rejects) => {
//     fs.readFile(path.join(__dirname, filePath), "utf8", (err, data) => {
//       resolve(data);
//     });
//   });
// }
// ReadFile("./name.txt")
//   .then((d) => {
//     return 1
//   })
//   .then(
//     (dd) => {
//       console.log(dd,'dd');
//     },
//     (e) => {
//       console.log(e,'e');
//     }
//   );

// let p2 = new Promise((resolve, rejects) => {
// 	setTimeout(()=>{
// 		resolve(1);
// 	},2000)
// }).then(
// 	(d) => {
// 		return 123
// 	},
// 	(e) => {
// 		console.log(e, "11111");
// 	}
// );
// p2.then(
// 	(dd) => {
// 		console.log(dd, "d");
// 	},
// 	(ee) => {
// 		console.log(ee, "e1111");
// 	}
// );

//循环引用 
// let p = new Promise((resolve, reject) => {
// 	resolve(200)
// })
// let p2 = p.then(() => {
// 	return p2
// }, (e) => {
// 	console.log(e);
// })

//返回promise
// let p=new Promise((resolve,reject)=>{
// 	resolve(200)
// })
// let p2 = p.then(()=>{
// 	return new Promise((resolve,rejects)=>{
// 		resolve(
// 			new Promise((resolve, rejects) => {
// 				resolve(2000);
// 			})
// 		);
// 	})
// },(e)=>{
// 	console.log(e);
// })
// p2.then((d)=>{
// 	console.log(d);
// })


//值的透传
// let p = new Promise((resolve, reject) => {
// 	resolve(1)
// })
// p.then().then().then().then((e) => {
// 	console.log(e);
// });


//all race
// let p=Promise.resolve(1)
// let p2 = Promise.resolve(2)
// let p1 = new Promise((resolve, reject) => {
// 	setTimeout(()=>{
// 		resolve(4000)
// 	},2000)
// })
// let p3 = new Promise((resolve,reject)=>{
// 	setTimeout(() => {
// 	resolve(3000)
// 	}, 3000)
// })
// let res = Promise.all([p1, p3]).then((d) => {
// 	console.log(d);
// });

//finally

// Promise.resolve(400).finally(() => {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			resolve('不管这里传了什么，都不会传入下个then')
// 		}, 2000)
// 	})
// }).then((d) => {
// 	// throw new Error('fail')
// 	console.log(d);
// }).catch((e)=>{
// 	console.log(e,);
// })

// Promise.reject(200).then((d) => {
// 	console.log(d);
// }).then((dd) => {
// 	console.log(dd);
// }, (e) => {
// 	console.log(e);
// })