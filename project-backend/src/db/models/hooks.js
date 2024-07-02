export const mongoSaveError = (error, data, next)=> {
    error.status = 400;
    next();
}

export const setMongoUpdateSettings = function(next){
    this.options.new = true;
    this.options.runValidators = true;
    next();
}
