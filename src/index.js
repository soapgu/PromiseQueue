const normal = require('./normalPromise');
const single = require('./singlePromise');
const SuperPromise = require('./superPromise');
const logger = require('./logger');

/**
 * 
 * @returns {(()=>Promise<string>)[]}
 */
const createTasks = ()=> [1,2,2,3,4].map( (item,index) => ()=> new Promise( (resolve, _reject) =>{
    logger.info( `task-${index} start` )
    setTimeout( ()=>{
        logger.info( `task-${index} end` );
        resolve(`task-${index} use ${item} second`);
    }, item * 1000 );
} ));

/**
 * 
 * @returns {(()=>Promise<string>)[]}
 */
const createAppendTasks = ()=> [1,2,3].map( (item,index) => ()=> new Promise( (resolve, _reject) =>{
    logger.info( `append task-${index} start` )
    setTimeout( ()=>{
        logger.info( `append task-${index} end` );
        resolve(`append task-${index} use ${item} second`);
    }, item * 1000 );
} ));

/**
 * 执行5个promise和3个追加的promise
 * @param {SuperPromise} excutor -异步执行对象
 */
async function run( excutor ){
    let tasks = excutor.excuteTasks( createTasks() );
    let appendTasks = excutor.excuteTasks( createAppendTasks() );
    let results = await tasks;
    logger.info( results );
    let appendResult = await appendTasks;
    logger.info( appendResult )
}

const main = async () => {
	console.log("---main begin---");
    console.log("<<<<<<< begin excute normal tasks >>>>>>>");
    await run(normal);
    console.log("<<<<<<< end excute normal tasks >>>>>>>");
    console.log("+++++++ begin excute single tasks +++++++");
    await run(single);
    console.log("+++++++ end excute single tasks +++++++");
};

main().catch(error => {
	console.error('============= main catched error:', error);
});



