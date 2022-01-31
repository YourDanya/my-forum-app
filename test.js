const lengthOfLongestSubstring = function(s) {
    let res= 0
    let temp =''
    let charArr=[]
    for (let i=0; i<s.length ; i++) {
        if (!charArr.includes(s[i])) {
            temp += s[i]
            charArr.push(s[i])
            console.log(temp)
            if (temp.length>res) {
                res=temp.length
            }
        }
        else {
            temp=''
            let index=charArr.find(s[i])
            charArr=[]
            i-=index
        }
    }
    return res
}

console.log(lengthOfLongestSubstring("abcabcbb"))

// Longest Substring Without Repeating Characters