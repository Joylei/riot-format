const units = 'KMG'

export default function bytes (input, fractionSize = 2, defaultValue = '--') {
    let num = Number(input)

    if (isNaN(num.valueOf()) || !isFinite(num.valueOf()) || num < 0) {
        return defaultValue
    }
    
    let i=0
    for(; num>=1024 && i<=3 ; i++) {
        num = num /1024
    }

    return i > 0 ? (num.toFixed(fractionSize) + units[i - 1]) : (num + '')
}
