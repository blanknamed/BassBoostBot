# BassBoostBot
Telegram bot for bassboosted tacks0))0

To run this, you'll need these CLI tools: 

1. sox - to process wav files.
2. parallel - simple parallel tasks interface for CL.
3. lame - convert wav -> mp3.
4. mp3val - for minimizing mp3 errors that occur when you concatenate files.

You'll also need **node 7** with **harmony** flag in order to use async/await.

## Algo

1. long-poll until get message
2. if audio, download file
3. bass boost it))00
4. split to $(number of cores) equal parts 
5. convert each part with lame
6. cat all files into one
7. minimize errors with mp3val
8. send back to user

