class ResponseType {
    constructor(
        public success: boolean,
        public data?: any,
        public messageError?: string,
        public errors?: any[]
    ) {};
}

export default ResponseType;