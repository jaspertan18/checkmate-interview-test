import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function SignedIn({
    joke,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div>
            <h1>Signed In</h1>
            {/* Task 3: Your own presentation of the joke here (Free Style 😉 )*/}
            {/* End of Task 3 */}
        </div>
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
