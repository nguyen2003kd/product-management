module.exports=(query)=>{
    let status=[{
        name: "Tất cả",
        status: "",
        class: "",
    },
    {
        name: "hoat động",
        status: "active",
        class: "",
    },
    {
        name: "dung hoat động",
        status : "inactive",
        class: "",
    }]
    if (query.status) {
        const indexStatus=status.findIndex((item) => item.status == query.status);
        status[indexStatus].class='active'; 
    }
    else {
        const indexStatus=status.findIndex((item) => item.status == '');
        status[indexStatus].class='active';
    }
    return status;
}