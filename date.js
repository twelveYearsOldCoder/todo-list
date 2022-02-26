module.exports.getDate =()=> {
    let options = {
        weekday: 'long',
        // year: 'numeric', 
        day: 'numeric',
        month: 'numeric'
        
    };

    let day = new Date().toLocaleDateString("en-US", options);
    return day;
}