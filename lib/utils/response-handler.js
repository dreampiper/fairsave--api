function responseHandler({ res, status, data }) {
    res.setHeader("Content-Type", "text/plain;charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, must-revalidate");
    res.status(status);
    res.end(JSON.stringify(data));
}
export default responseHandler;
//# sourceMappingURL=response-handler.js.map