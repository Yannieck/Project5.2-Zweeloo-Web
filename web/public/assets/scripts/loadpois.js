const getRoute = async (id) => {
    const result = await fetch(`http://127.0.0.1:3000/api/routes/route/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    let data = await result.json();

    const pois = data.poi;
    const nodes = data.node;

    console.log(pois);
    console.log(nodes);
};

getRoute(1);