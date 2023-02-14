import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import {
    Container,
    Heading,
    Button,
    Flex,
    Box,
    Divider,
    Text,
    Card,
    CardBody,
    CardFooter,
} from "@chakra-ui/react";

export default function SignedIn({
    joke,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <Container mt="10%">
            <Heading size="xl">Signed In</Heading>
            {/* Task 3: Your own presentation of the joke here (Free Style 😉 )*/}
            <Card mt="3%">
                <CardBody>
                    <Flex alignItems="center" justifyContent="space-between">
                        <Box w="70%">
                            <Text>{joke.setup}</Text>
                        </Box>
                        <Button isDisabled={show} onClick={() => setShow(true)}>
                            Reveal
                        </Button>
                    </Flex>
                    {show ? (
                        <Box w="70%">
                            <Divider m="2% 0" />
                            <Text>{joke.punchline}</Text>
                        </Box>
                    ) : (
                        <></>
                    )}
                </CardBody>
                <CardFooter>
                    <Button
                        colorScheme="twitter"
                        isLoading={loading}
                        onClick={() => {
                            window.location.reload();
                            setLoading(true);
                        }}
                    >
                        Next joke
                    </Button>
                </CardFooter>
            </Card>
            {/* End of Task 3 */}
        </Container>
    );
}

// Task 2: Fetch random jokes from the API
// https://official-joke-api.appspot.com/jokes/programming/random
export const getServerSideProps: GetServerSideProps = async (context) => {
    // Fetch data from external API and pass it to the page via props.joke
    const data = await fetch(
        "https://official-joke-api.appspot.com/jokes/programming/random"
    )
        .then((res) => res.json())
        .then((data) => {
            console.log(data[0]);
            return data[0];
        })
        .catch((err) => console.log(err));

    return {
        props: {
            joke: {
                type: data.type,
                setup: data.setup,
                punchline: data.punchline,
            },
        }, // will be passed to the page component as props
    };
};
