
async function test(){

    return greeting = await Promise.reject("MY NAME IS ERR");
}

test().then(res =>{
    console.log(res);
}).catch(err=>{
    console.log(err);
});
console.log("hi");


