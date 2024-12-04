import {get,post} from './http'

//获取考试数据
function getQuizMessage(){
    return get('/statistic/exam-static')
}

//考试情况实时统计
function getNowTimeStatistics(id: number){
    return post(`/statistic/nowTimeStatistics?id=${id}`)
}
//当前选中的考试信息（数据大屏）
function getQuizInfo(id: number){
    return post(`/statistic/quizInfo?id=${id}`)
}
export {
    getNowTimeStatistics,getQuizInfo,getQuizMessage
}