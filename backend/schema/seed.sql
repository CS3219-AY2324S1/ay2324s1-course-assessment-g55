INSERT INTO users (userid, username)
VALUES 
(1, 'John'),
(2, 'Jane'),
(3, 'Bob'),
(4, 'Alice'),
(5, 'Joe'),
(6, 'Mary'),
(7, 'Bill'),
(8, 'Kate'),
(9, 'Mike'),
(10, 'Sue'),
(11, 'Tom'),
(12, 'Ann'),
(13, 'Tim'),
(14, 'Sara'),
(15, 'Sam'),
(16, 'Beth'),
(17, 'Dan'),
(18, 'Kim'),
(19, 'Ron'),
(20, 'Liz'),
(21, 'Darren'),
(22, 'Timothy123'),
(23, 'Haoze'),
(24, 'Brian'),
(25, 'Ming Wei'),
(26, 'Francis'),
(27, 'Ai Lin');

INSERT INTO adminUsers (userid)
VALUES
(23),
(24),
(25),
(26),
(27);

INSERT INTO questions (questionTitle, categories, difficulty)
VALUES
('Reverse a String', Array ['Strings', 'Algorithms'], 'easy'),
('Roman to Integer', Array ['Data Structures', 'Algorithms'], 'easy'),
('Add Binary', Array ['Bit Manipulation', 'Algorithms'], 'easy'),
('Fibonacci Number', Array ['Recursion', 'Algorithms'], 'easy'),
('Implement Stack using Queues', Array ['Data Structures'], 'easy'),
('Repeated DNA Sequences', Array ['Algorithms', 'Bit Manipulation'], 'medium'),
('Course Schedule', Array ['Data Structures', 'Algorithms'], 'medium'),
('LRU Cache Design', Array ['Data Structures'], 'medium'),
('Longest Common Subsequence', Array ['Strings', 'Algorithms'], 'medium'),
('Airplane Seat Assignment Probability', Array ['Brainteaser'], 'medium'),
('Sliding Window Maximum', Array ['Arrays', 'Algorithms'], 'hard'),
('Wildcard Matching', Array ['Strings', 'Algorithms'], 'hard'),
('Chalkboard XOR Game', Array ['Brainteaser', 'Bit Manipulation'], 'hard');
