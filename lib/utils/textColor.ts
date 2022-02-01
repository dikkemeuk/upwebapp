export function stripColors(str: string) {
    

    return str.replaceAll("^^11", "^1")
    .replaceAll("^^22", "")
    .replaceAll("^^33", "")
    .replaceAll("^^44", "")
    .replaceAll("^^55", "")
    .replaceAll("^^66", "")
    .replaceAll("^^77", "")
    .replaceAll("^^88", "")
    .replaceAll("^^99", "")
    .replaceAll("^^00", "")
    .replaceAll("^1", "")
    .replaceAll("^2", "")
    .replaceAll("^3", "")
    .replaceAll("^4", "")
    .replaceAll("^5", "")
    .replaceAll("^6", "")
    .replaceAll("^7", "")
    .replaceAll("^8", "")
    .replaceAll("^9", "")
    .replaceAll("^0", "")
}

export function coloredText(string: string) {
    const fixed = `<span class="text-white">${string}</span>`;

    return fixed.replaceAll("^^11", `^1`)
    .replaceAll("^^22", `^2`)
    .replaceAll("^^33", `^3`)
    .replaceAll("^^44", `^4`)
    .replaceAll("^^55", `^5`)
    .replaceAll("^^66", `^6`)
    .replaceAll("^^77", `^7`)
    .replaceAll("^^88", `^8`)
    .replaceAll("^^99", `^9`)
    .replaceAll("^^00", `^0`)
    .replaceAll("^1", `</span><span class="text-red-500">`)
    .replaceAll("^2", `</span><span class="text-green-500">`)
    .replaceAll("^3", `</span><span class="text-yellow-500">`)
    .replaceAll("^4", `</span><span class="text-blue-800">`)
    .replaceAll("^5", `</span><span class="text-blue-500">`)
    .replaceAll("^6", `</span><span class="text-pink-500">`)
    .replaceAll("^7", `</span><span class="text-white">`)
    .replaceAll("^8", `</span><span class="text-gray-500">`)
    .replaceAll("^9", `</span><span class="text-gray-500">`)
    .replaceAll("^0", `</span><span class="text-black">`)
}

