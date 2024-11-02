class Quiz {
     
    constructor (questions, timeLimit, timeRemaining) {
          this.questions=questions;
          this.timeLimit=timeLimit;
          this.timeRemaining=timeRemaining;
          this.correctAnswers=0;
          this.currentQuestionIndex=0;
     }
//getQestion()
     getQuestion(){
        return this.questions[this.currentQuestionIndex];
     }
//moveToNextQuestion()    
     moveToNextQuestion(){
        this.currentQuestionIndex +=1;
     }
// shuffleQuestions()
     shuffleQuestions(){
        for (let i=this.questions.length-1;i>0;i--){
            const j=Math.floor(Math.random()*(i,1));
            [this.questions[i],this.questions[j]] = [this.questions[j],this.questions[i]];
     }
    }
 //checkAnswer()   
     checkAnswer(answer){
         const currentQuestionIndex = this.getQuestion();
        if (currentQuestionIndex.correctAnswer===answer) {
            this.correctAnswer +=1;
            return this.correctAnswers;
     }
    } 
//hasEnded()
     hasEnded(){
        if (this.currentQuestionIndex >= this.questions.length){
            return true;
        } else {
            return false;
        }
    }
//filterQuestionByDifficulty()
    filterQuestionsByDifficulty(difficulty) {
        
        if (typeof difficulty === 'number' && difficulty >= 1 && difficulty <= 3) {
            
            this.questions = this.questions.filter(question => question.difficulty === difficulty);
        }
        
    }
//averageDifficulty()
    averageDifficulty(){
        if(this.questions.length===0){
            return 0;
        }
        const totalDifficulty=this.questions.reduce((sum,question) => sum + question.difficulty,0);
        return totalDifficulty/this.questions.length;
    }
}




const questions = [
    { question: "What is 2 + 2?", answer: 4, difficulty: 1 },
    { question: "What is the capital of France?", answer: "Paris", difficulty: 2 },
    { question: "What is the square root of 16?", answer: 4, difficulty: 1 },
    { question: "What is 5 + 7?", answer: 12, difficulty: 3 }
];
const quiz = new Quiz(questions);
console.log(quiz.checkAnswer(4)); 
console.log(quiz.correctAnswers);
console.log(quiz.checkAnswer("London"));
quiz.filterQuestionsByDifficulty(1); 
console.log(quiz.questions); 
console.log(quiz.averageDifficulty());
