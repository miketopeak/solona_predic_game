import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useMoralisCloudFunction } from "react-moralis";
import BetCard from "../BetCard";

const ActivePredictions = () => {
    const [ isFetching, setIsFetching ] = useState(true);
    const [ predictions, setPredictions ] = useState([]);

    const { fetch } = useMoralisCloudFunction(
        "getPredictions",
        { status: true },
        { autoFetch: false }
    );

    useEffect(() => {
        fetch({
            onSuccess: (result) => {
                setPredictions(result);
                setIsFetching(false);
            },
            onError: (error) => {
                console.log(error);
                setIsFetching(false);
            }
        });
    }, []);

    if(isFetching) {
        return <div>Loading...</div>
    }
    
    return (
        <Flex
            gap={2}
            flexWrap="wrap"
            justifyContent={["center", "center", "flex-start", "flex-start"]}
        >
            {
                predictions.map(prediction => {
                    const { id, attributes, createdAt, updatedAt } = prediction;
                    return <BetCard 
                        key={id} 
                        id={id}
                        attributes={attributes}
                        createdAt={createdAt}
                        updatedAt={updatedAt}
                        />
                })
            }
        </Flex>
    )
}
export default ActivePredictions;