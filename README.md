# WebsiteGenerator

All files were created by us, we did not base the code off of anyone else. This project requires nodejs in order to run. We used gpt3.5-turbo API, so we did not train any models ourselves. 

OPTION A: (use the testing program to generate programs in v1, v2, v3 for each prompt in the prompts array in the scripts/testing.js file)

1. npm install
2. node v1/generate-projects.js
3. node v2/generate-projects.js
4. node v3/generate-projects.js **WARNING: THIS WILL CREATE 25 REACT PROJECTS ON YOUR SYSTEM** (there was probably a way to figure out how to make multiple React projects share a node modules folder, but :/)
5. node scripts/testing.js 

This will create three projects for each prompt in the prompts array, created by v1, v2, and v3. v1 and v2 are HTML/CSS/JS, and v3 is React.

OPTION B: (generate a single site)

1. Go to the appropriate file in the scripts folder (gpt3_v[1|2|3].js)
2. Uncomment the call to v1(), v2(), or v3()
3. Run the file, it will ask you to input a prompt
