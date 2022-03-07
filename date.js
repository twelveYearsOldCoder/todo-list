module.exports.getDate =()=> {
    const options = {
        weekday: 'long',
        // year: 'numeric', 
        day: 'numeric',
        month: 'numeric'
        
    };

    const day = new Date().toLocaleDateString("en-US", options);
    return day;
}