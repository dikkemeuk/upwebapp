export function stripColors(str: string) {
    

    return str.split("^^11").join("")
    .split("^^22").join("")
    .split("^^33").join("")
    .split("^^44").join("")
    .split("^^55").join("")
    .split("^^66").join("")
    .split("^^77").join("")
    .split("^^88").join("")
    .split("^^99").join("")
    .split("^^00").join("")
    .split("^1").join("")
    .split("^2").join("")
    .split("^3").join("")
    .split("^4").join("")
    .split("^5").join("")
    .split("^6").join("")
    .split("^7").join("")
    .split("^8").join("")
    .split("^9").join("")
    .split("^0").join("")
}

export function coloredText(string: string) {
    const fixed = `<span class="text-white">${string}</span>`;

    return fixed.split("^^11").join("^1")
    .split("^^22").join("^2")
    .split("^^33").join("^3")
    .split("^^44").join("^4")
    .split("^^55").join("^5")
    .split("^^66").join("^6")
    .split("^^77").join("^7")
    .split("^^88").join("^8")
    .split("^^99").join("^9")
    .split("^^00").join("^0")
    .split("^1").join(`</span><span class="text-red-500">`)
    .split("^2").join(`</span><span class="text-green-500">`)
    .split("^3").join(`</span><span class="text-yellow-500">`)
    .split("^4").join(`</span><span class="text-blue-800">`)
    .split("^5").join(`</span><span class="text-blue-500">`)
    .split("^6").join(`</span><span class="text-pink-500">`)
    .split("^7").join(`</span><span class="text-white">`)
    .split("^8").join(`</span><span class="text-gray-500">`)
    .split("^9").join(`</span><span class="text-gray-700">`)
    .split("^0").join(`</span><span class="text-black">`)
}

