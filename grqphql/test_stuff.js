/*
THIS IS NOT A PART OF THE APP!!
This is just a sandbox for interview training
*/

let questions = [
    function calculateInfix(){
        // compute "3+29-((14+7)-(6-8))";
    },
    function implCurry(){
        // Implement curry function
    },
    function doQuickSort(){
        //Sort by age+experience
        const test = [3, 2, 20, 0, 5, 5];
    },
    function doMergeSort(){
        //Sort by age
        const test = [30, 4, 8, 3, 1, 0];
    },
    function doBucketSort(){
        //SKIP
    },
    function doBinarySearch(){
        const test = [2, 5, 8, 10, 11];
    },
    function areCharsUniq(){
        // are chars in string unique
    },
    function areWordsPerm(){
        // check if one string is permutation of other
    },
    function spaceToCode(){
        //replace all spaces in a string with %20
    },
    function palindromePermutation(){
        // Check if a string is a permutation of a palindrome
    },
    function oneEditAway(){
        // edits: insert char, delete char, replace char
    },
    function doLCS(){
        // find longest common subsequence

        // console.info(lcs("ABRCDGH", "JAEDFHR"))
        // console.info(lcs("ABC", "AC"))
    },
    function TREES(){
        // GRaphs and stuff
    },
    function doFib(){
        //memoize it!
    },
    function doChildJumps(){
        // running up n stairs, can jump up 1, 2, or 3 stairs at a time
        // count how many ways they can jump up the stairs
    },
    function doGridRobot(){

        var grid = [
            ['0', 'x', '0', '0'],
            ['0', 'x', '0', '0'],
            ['0', '0', 'x', '0'],
            ['x', '0', '0', '0'],
            ['0', 'x', '0', '0'],
        ];


    },
    function doMagixIndex(){
        //arr is a sorted array
        //find i such that arr[i]=i
        //[-10,-1,2,4,5,6,8,9] -> 1
    },
    function doPowerSet(){
        //given a set, return all subsets
    },
    function doRecursiveMulti(){
        //implement multiplication without using *

    },
    function doLongestContig(){
        function findLongest(first, second){

        }
        const first = ["poe","hi", "lol", "hello", "job", "money", "need"];
        const second = ["poe", "hi", "lob", "hello", "job", "money"];
        const third = ["need", "lolr", "hellor"];

        // console.info(findLongest(first, second), "should be [hello,job,money]");
        // console.info(findLongest(third, second), "should be []");
        // console.info(findLongest(third, first), "should be [need]");
        // console.info(findLongest(third, third), "should be [need, lolr, hellor]");
    }

]

module.exports = function(stuff){
    questions.forEach(func=>func());
}