///////////////////////////////////////////////////////////////////////////////////////////
// Quiz App Requirements:
// 1) Use classes
// 2) Use the prompt and alert functions to present your quiz
// 3) Give the user 5 questions
// 4) Each question has one possible answer from a list of answers
//    (Give the user a minimum of 3 and no more than 5 choices)
// 5) Assign points to each question and maintain a running total for the quiz
// 6) If you allow the user to retake the question until they get it correct,
//   deduct 1 point each time they get the question wrong
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
// Class that defines the Question Object.
///////////////////////////////////////////////////////////////////////////////////////////
class Question {
    public objQuestionText: string;
    public objPossibleAnswerText: string;
    public objCorrectAnswerText: string;
}

let selectedQuestions: Question[] = [];

let cannedQuestion = [
    {
        questionText: "What number is missing from this sequence?   4, 9, 16, 25, 36, ?, 64",
        possibleAnswerText: "a) 41  b) 45  c) 52  d) 49  e) 56",
        correctAnswerText: "d"
    },
    {
        questionText: "If FP = 10 and HX = 16, what does DS = ?",
        possibleAnswerText: "a) 22  b) 15  c) 21  d) 16  e) 20",
        correctAnswerText: "b"
    },
    {
        questionText: "What letter is the best choice to appear next in this sequence?  L   K   J   H  ?",
        possibleAnswerText: "a) I  b) G  c) L  d) Z  e) E",
        correctAnswerText: "b"
    },
    {
        questionText: "What number is the best choice to appear next in this sequence?  1   3   7  13  ?",
        possibleAnswerText: "a) 1  b) 16  c) 17 d) 19  e) 23",
        correctAnswerText: "d"
    },
    {
        questionText: "What letter is the best choice to appear next in this sequence?  S   M   G   C  ?",
        possibleAnswerText: "a) S  b) A  c) G  d) H  e) B",
        correctAnswerText: "b"
    }
]; 



///////////////////////////////////////////////////////////////////////////////////////////
// For "each entire quiz question", initialize the variables
let studentInput = '';                          // student's input string                        
let studentInputScrubbed = '';                  // student's turn scrubbed input string
let studentInputScrubbedLengthConstant = 1;     // desired length of student's input
let timesThisQuestionAnswered = 0;              // number of times student has attempted answer this question
let currentScore = 0;
let pointsTotalPossible = 100;
let selectedQuestionsTotal = cannedQuestion.length;
let pointsPerQuestion = pointsTotalPossible / selectedQuestionsTotal;

let inputErrorMessage = `Your input must be only 1 character = a or b or c or d or e.`;
let studentInstructionsMessage = `Answer the following question by typing the letter of the best answer:`;
let correctAnswerMessage = `Your answer is correct!`;
let wrongAnswerMessage = `Your answer is incorrect - try another answer.`;
let currentScoreMessage1 = `Score is `;
let currentScoreMessage2 = ` points out of `;
let currentScoreMessage3 = ` possible points. `;
let pointsText = ` points `;
let studentResponseText = `student response=`;
let alertText = ``;
let consoleText = ``;
let studentQuestion = ``;

let messageType = '';
let messageTypeConsole = 'console';
let messageTypePromptOrAlert = 'promptOrAlert';

let messageNumberStudentQuestionInitial = 0;
let messageNumberStudentResponse = 1;
let messageNumberStudentCorrectAnswer = 2;
let messageNumberStudentWrongAnswer = 3;
let messageNumberStudentAcedIt = 4;
let messageNumberStudentDidQuiteWell = 5;

let validInput = false;                         // indicates whether student's edited input is valid
let quizIsOver = false;                         // terminate quiz for whatever reason
let studentCanceledQuiz = false;                // student intentionally canceled quiz intentionally by clicking CANCEL or CLOSE button
let endOfQuestion = false;                      // endOfQuestion = true when validInput is true or studentCanceledQuiz is true or quizIsOver is true


// select questions for the quiz from the canned set of questions which can be randomized for variety
for (let i = 0; i < selectedQuestionsTotal; i++) {
    selectedQuestions.push({
        objQuestionText: cannedQuestion[i].questionText,
        objPossibleAnswerText: cannedQuestion[i].possibleAnswerText,
        objCorrectAnswerText: cannedQuestion[i].correctAnswerText
    });
    console.log(selectedQuestions[i]);
}  
console.log(selectedQuestions);

///////////////////////////////////////////////////////////////////////////////////////////
// Driver for the one execution of the quiz.
///////////////////////////////////////////////////////////////////////////////////////////

for (let questionIndex = 0; questionIndex < selectedQuestionsTotal; questionIndex++) {

    // Prepare the question prompt.
    let questionNumber = questionIndex + 1;

    timesThisQuestionAnswered = 0;

    //studentQuestion = buildText(messageNumberStudentQuestionInitial, messageTypePromptOrAlert, questionIndex);
    //studentInput = prompt(studentQuestion);
    //consoleText = buildText(messageNumberStudentQuestionInitial, messageTypeConsole, questionIndex);
    //console.log(consoleText);

    //// Log the student's response to the prompt
    //consoleText = buildText(messageNumberStudentResponse, messageTypeConsole, questionIndex);
    //console.log(consoleText);

    ///////////////////////////////////////////////////////////////////////////////////////////
    // Driver for student's answer validation:
    //  This allows the student to provide indefinite number of incorrect answers or invalid input to the questions.
    //  VALID DATA consists of an answer of 'a' or 'b' or 'c' or 'd' or 'e' (upper or lowercase):
    //  HOWEVER:
    //    If the student clicks CANCEL or CLOSE button, it is considered an intentional cancel and the quiz is terminated.
    //    If the student enters a valid character, one point is deducted from the total score.
    //    if the student enters an invalid character, no points are deducted.
    ///////////////////////////////////////////////////////////////////////////////////////////

    do {
        validInput = false;

        timesThisQuestionAnswered++;        // bump the times student has attempted given answer to this question.

        if (timesThisQuestionAnswered == 1) {
            consoleText = buildText(messageNumberStudentQuestionInitial, messageTypeConsole, questionIndex);
            console.log(consoleText);
            studentQuestion = buildText(messageNumberStudentQuestionInitial, messageTypePromptOrAlert, questionIndex);
            studentInput = prompt(studentQuestion);
        }
        else {
            consoleText = buildText(messageNumberStudentWrongAnswer, messageTypeConsole, questionIndex);
            console.log(consoleText);
            studentQuestion = buildText(messageNumberStudentWrongAnswer, messageTypePromptOrAlert, questionIndex);
            studentInput = prompt(studentQuestion);
        }

        // Log the student's response to the prompt
        // consoleText = buildText(messageNumberStudentResponse, messageTypeConsole, questionIndex);
        // console.log(consoleText);

        // Player clicking prompt window's CANCEL or CLOSE BUTTON causes playerInput = null 
        // (considered a request to intentionally end game)
        if (studentInput == null) {
            studentCanceledQuiz = true;
            quizIsOver = true;
            validInput = true;
            break;
        }


        // check if student's answer is correct length and convert it so lower case for validation
        // else if (studentInput.length >= studentInputScrubbedLengthConstant) {    // clicking OK without entering sufficient length input
        if (studentInput.length >= studentInputScrubbedLengthConstant) {  
            studentInputScrubbed = studentInput.replace(/ /g, "");          // eliminate spaces
            studentInputScrubbed = studentInputScrubbed.toLowerCase();      // convert to lower case

            console.log('studentInputScrubbed.length=' + studentInputScrubbed.length); //debug only
            console.log('studentInputScrubbed=' + studentInputScrubbed); //debug only
            console.log('correct answer=' + selectedQuestions[questionIndex].objCorrectAnswerText); //debug only
            
            // check if student's input answer matches correct answer to question
            if ((studentInputScrubbed.length == studentInputScrubbedLengthConstant)
                && (studentInputScrubbed == selectedQuestions[questionIndex].objCorrectAnswerText)) {
                // student has correct answer
                validInput = true;
                currentScore += pointsPerQuestion;
                alertText = buildText(messageNumberStudentCorrectAnswer, messageTypePromptOrAlert, questionIndex);
                alert(alertText);
                consoleText = buildText(messageNumberStudentCorrectAnswer, messageTypeConsole, questionIndex);
                console.log(consoleText);
            }
            else {
                // student has wrong answer 
                currentScore--;
            }
        } 
        else {
            // student has invalid answer 
            currentScore--;
        }
        console.log('end of single question logic');

        endOfQuestion = false;
        if (studentCanceledQuiz) { endOfQuestion = true; }
        if (validInput) { endOfQuestion = true; }
        if (quizIsOver) { endOfQuestion = true; }
      
    } while (!endOfQuestion); // end of do loop for a single question

    if (studentCanceledQuiz) { break; }  // break out of for loop - no more questions

} // end of for loop for entire quiz 


if (currentScore / pointsTotalPossible * 100 >= 100) {
    alertText = buildText(messageNumberStudentAcedIt, messageTypePromptOrAlert, 0);
    alert(alertText);
    consoleText = buildText(messageNumberStudentAcedIt, messageTypeConsole, 0);
    console.log(consoleText);
}
else if (currentScore / pointsTotalPossible * 100 >= 70) {
    alertText = buildText(messageNumberStudentDidQuiteWell, messageTypePromptOrAlert, 0);
        alert(alertText);
        consoleText = buildText(messageNumberStudentDidQuiteWell, messageTypeConsole, 0);
        console.log(consoleText);
}




///////////////////////////////////////////////////////////////////////////////////////////
// Function to build text for all messages.
///////////////////////////////////////////////////////////////////////////////////////////

function buildText(parmMessageNumber: number, parmMessageType: string, parmQuestionIndex: number) {

    let returnText = ``;

    switch (parmMessageNumber) {

        // build message for first time student is asked a question.
        case messageNumberStudentQuestionInitial: {
            if (parmMessageType == messageTypePromptOrAlert) {
                returnText += `${studentInstructionsMessage}`;
                returnText += `\n ${parmQuestionIndex + 1})`;
                returnText += ` ${selectedQuestions[parmQuestionIndex].objQuestionText}`;
                returnText += `\n ${selectedQuestions[parmQuestionIndex].objPossibleAnswerText}`;
                returnText += `\n ${pointsPerQuestion}`;
                returnText += `${pointsText}`;
            }
            else {
                returnText += `${studentInstructionsMessage}`
                returnText += ` ${parmQuestionIndex + 1})`;
                returnText += ` ${selectedQuestions[parmQuestionIndex].objQuestionText}`;
                returnText += ` ${selectedQuestions[parmQuestionIndex].objPossibleAnswerText}`;
                returnText += ` ${pointsPerQuestion}`;
                returnText += `${pointsText}`;
            }
            return returnText;  // break; not needed since return does not fall thru.
        }

        // build message for first time student is asked a question.
        case messageNumberStudentResponse: {
            studentResponseText
            returnText += `${studentResponseText}`;
            returnText += `${studentInput}`;
            return returnText;  // break; not needed since return does not fall thru.
        }

        // build message that student has correct answer
        case messageNumberStudentCorrectAnswer: {
            if (parmMessageType == messageTypePromptOrAlert) {
                returnText += `${correctAnswerMessage}`;
                returnText += `\n${currentScoreMessage1}`;
                returnText += `${currentScore}`;
                returnText += `${currentScoreMessage2}`;
                returnText += `${pointsTotalPossible}`;
                returnText += `${currentScoreMessage3}`;
                return returnText;  // break; not needed since return does not fall thru.

            }
            else {
                returnText += `${correctAnswerMessage}`;
                returnText += `${currentScoreMessage1}`;
                returnText += `${currentScore}`;
                returnText += `${currentScoreMessage2}`;
                returnText += `${pointsTotalPossible}`;
                returnText += `${currentScoreMessage3}`;
                return returnText;  // break; not needed since return does not fall thru.
            }
        }

        // build message that student has wrong answer or invalid format input
        case messageNumberStudentWrongAnswer: {
            if (parmMessageType == messageTypePromptOrAlert) {
                returnText += `${wrongAnswerMessage}`;
                returnText += `\n${currentScoreMessage1}`;
                returnText += `${currentScore}`;
                returnText += `${currentScoreMessage2}`;
                returnText += `${pointsTotalPossible}`;
                returnText += `${currentScoreMessage3}`;
                returnText += `\n\n`;
                returnText += `${studentInstructionsMessage}`;
                returnText += `\n${parmQuestionIndex + 1})`;
                returnText += ` ${selectedQuestions[parmQuestionIndex].objQuestionText}`;
                returnText += `\n${selectedQuestions[parmQuestionIndex].objPossibleAnswerText}`;
                returnText += `\n${pointsPerQuestion}`;
                returnText += `${pointsText}`;
                return returnText;  // break; not needed since return does not fall thru.
            }
            else {
                returnText += `${wrongAnswerMessage}`;
                returnText += `${currentScoreMessage1}`;
                returnText += `${currentScore}`;
                returnText += `${currentScoreMessage2}`;
                returnText += `${pointsTotalPossible}`;
                returnText += `${currentScoreMessage3}`;

                returnText += `${studentInstructionsMessage}`
                returnText += ` ${parmQuestionIndex + 1})`;
                returnText += ` ${selectedQuestions[parmQuestionIndex].objQuestionText}`;
                returnText += ` ${selectedQuestions[parmQuestionIndex].objPossibleAnswerText}`;
                returnText += ` ${pointsPerQuestion}`;
                returnText += `${pointsText}`;
                return returnText;  // break; not needed since return does not fall thru.
            }
        }

        // Student has made 100%
        case messageNumberStudentAcedIt: {
            returnText += `Quiz is over and you have aced it!!!  CONGRATULATIONS!!!`;
            return returnText;  // break; not needed since return does not fall thru.
        } 

        // Student has made over 80%
        case messageNumberStudentDidQuiteWell: {
            returnText += `Quiz is over and you have done quite well!!!  CONGRATULATIONS!!!`;
            return returnText;  // break; not needed since return does not fall thru.
        } 

        // should always return a value else error
        default: {
            return `error: missing message text`;
            // break; not needed since return does not fall thru.
        }
    }
}