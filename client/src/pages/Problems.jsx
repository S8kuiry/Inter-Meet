import React from 'react'
import Navbar from '../components/Navbar'
import { ArrowRight, Code2, Crown, MoveRight, Users } from 'lucide-react'

const Problems = () => {

  const problemData =
    [
      {
        "id": 1,
        "title": "Two Sum",
        "difficulty": "Easy",
        "category": "Array",
        "description": "Given an array nums and an integer target, return indices of two numbers such that they add up to target."
      },
      {
        "id": 2,
        "title": "Reverse String",
        "difficulty": "Easy",
        "category": "String",
        "description": "Reverse the characters of a string without using built-in reverse functions."
      },
      {
        "id": 3,
        "title": "Valid Parentheses",
        "difficulty": "Easy",
        "category": "Stack",
        "description": "Given a string with brackets, return true if the parentheses are valid and properly closed."
      },
      {
        "id": 4,
        "title": "Move Zeroes",
        "difficulty": "Easy",
        "category": "Array",
        "description": "Move all zeroes to the end of the array while maintaining the relative order of non-zero elements."
      },
      {
        "id": 5,
        "title": "Contains Duplicate",
        "difficulty": "Easy",
        "category": "Hashing",
        "description": "Return true if any number appears more than once in the array."
      },
      {
        "id": 6,
        "title": "Longest Substring Without Repeating Characters",
        "difficulty": "Medium",
        "category": "Sliding Window",
        "description": "Return the length of the longest substring without repeating characters."
      },
      {
        "id": 7,
        "title": "3Sum",
        "difficulty": "Medium",
        "category": "Array",
        "description": "Find all unique triplets in the array that sum to zero."
      },
      {
        "id": 8,
        "title": "Add Two Numbers",
        "difficulty": "Medium",
        "category": "Linked List",
        "description": "Linked lists represent numbers. Add them and return the sum as a linked list."
      },
      {
        "id": 9,
        "title": "Word Break",
        "difficulty": "Medium",
        "category": "Dynamic Programming",
        "description": "Given a string and a dictionary, determine if the string can be segmented into dictionary words."
      },
      {
        "id": 10,
        "title": "Longest Increasing Subsequence",
        "difficulty": "Medium",
        "category": "Dynamic Programming",
        "description": "Find the length of the longest strictly increasing subsequence."
      },
      {
        "id": 11,
        "title": "Serialize and Deserialize Binary Tree",
        "difficulty": "Hard",
        "category": "Tree",
        "description": "Design an algorithm to serialize and deserialize a binary tree."
      },
      {
        "id": 12,
        "title": "Median of Two Sorted Arrays",
        "difficulty": "Hard",
        "category": "Binary Search",
        "description": "Find the median of two sorted arrays of different sizes in O(log n) time."
      },
      {
        "id": 13,
        "title": "N-Queens",
        "difficulty": "Hard",
        "category": "Backtracking",
        "description": "Place n queens on an n×n chessboard such that no two queens attack each other."
      }
    ]





  return (
    <>
      {/*-----------  Nvbar -------- */}
      <Navbar />
      {/*---------------- page section ------------------ */}

      <div className="w-full min-h-[100vh] bg-black flex flex-col items-center pt-28 pb-20 px-15 ">
        <div className="w-full max-w-7xl   ">

          {/*----------- header left ---------- */}
          <div className="w-full flex flex-col gap-1 ">
            <p className='text-gray-300 text-3xl font-bold' >Practice Problems</p>
            <p className='text-sm text-gray-500'>Sharpen your coding skills with these curated problems</p>
          </div>

          {/*------------ problems-section -------------- */}
          <div className="mt-10 w-full flex flex-col gap-1 max-h-[70vh] overflow-y-scroll">
            {problemData?.map((itm, index) => (
              <div className="relative w-full py-3 px-4 my-2 flex flex-col bg-[#1A1A1A] rounded-lg">

                {/* -------------- icon solve ------------- */}
                <div className="absolute items-center text-green-600 top-4 right-4 flex gap-1 ">
                  <p className='text-xs'>Solve</p>
                  <ArrowRight className='size-3' />
                </div>

                {/* ---------- Problem Info  Section ---------- */}
                <div className="flex items-center gap-4 h-full">

                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-lg 
            flex items-center justify-center bg-green-600/10">
                    <Code2 className="text-green-400  size-4" />
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col justify-center">

                    {/* Title + Tag */}
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold text-lg tracking-tight">
                        Two Sum
                      </span>
                      <span className={`text-black text-xs font-semibold px-2 py-0.1 rounded-full  ${itm.difficulty === "Easy" && "bg-green-600 "}
                   ${itm.difficulty === "Hard" && "bg-red-600 "}   ${itm.difficulty === "Medium" && "bg-yellow-600 "}  shadow-md`}>
                        {itm.difficulty}
                      </span>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center gap-3 mt-1 ">

                      <p className='text-xs text-gray-500/90'>Category : {itm.category}</p>


                    </div>
                  </div>
                </div>

                <p className='text-xs mt-2 text-gray-400 mb-2'>{itm.description}</p>

              </div>
            ))}

          </div>




        </div>

 {/*--------------- Stats Section -----------------*/}
<div className="mt-10 w-full max-w-7xl py-3 px-8 my-2 
                bg-[#1A1A1A]/80 backdrop-blur-md 
                border border-white/10 rounded-lg 
                shadow-[0_0_30px_rgba(0,0,0,0.4)]
                grid grid-cols-4 gap-6">

  {/* Total Problems */}
  <div className="flex flex-col items-start gap-3 p-4 
                  border-r border-white/10 last:border-none">
    <p className="text-gray-500 text-xs  tracking-wide">Total Problems</p>
    <p className="text-3xl font-extrabold text-teal-500">{problemData.length}</p>
  </div>

  {/* Easy */}
  <div className="flex flex-col items-start gap-3 p-4 
                  border-r border-white/10 last:border-none">
    <p className="text-gray-500 text-xs  tracking-wide">Easy</p>
    <p className="text-3xl font-extrabold text-green-500">
      {problemData.filter((itm)=> itm.difficulty === "Easy").length}
    </p>
  </div>

  {/* Medium */}
  <div className="flex flex-col items-start gap-3 p-4 
                  border-r border-white/10 last:border-none">
    <p className="text-gray-500 text-xs  tracking-wide">Medium</p>
    <p className="text-3xl font-extrabold text-yellow-500">
      {problemData.filter((itm)=> itm.difficulty === "Medium").length}
    </p>
  </div>

  {/* Hard */}
  <div className="flex flex-col items-start gap-3 p-4 ">
    <p className="text-gray-500 text-xs  tracking-wide">Hard</p>
    <p className="text-3xl font-extrabold text-red-500">
      {problemData.filter((itm)=> itm.difficulty === "Hard").length}
    </p>
  </div>

</div>

      </div>
    </>
  )
}

export default Problems