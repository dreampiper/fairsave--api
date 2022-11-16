export function handleError(middleware, req, res, next) {
    middleware(req, res, (err) => {
        if (err) {
            console.error(err);
            res.sendStatus(400); // Bad request
        }
        next();
    });
}
//# sourceMappingURL=middleware.js.map