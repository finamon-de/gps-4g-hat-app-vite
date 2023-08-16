import { Alert, Row } from "react-bootstrap"
import { ContentViewLayout } from "../layouts/ContentViewLayout"

export const StartView = (props: any) => {
    return (
        <ContentViewLayout title={'Start'}>
            <Row>
                <Alert variant={'info'}>
                    <Alert.Heading>
                        <h4>Welcome</h4>
                    </Alert.Heading>
                    <p>Select an item in the navigation to start your journey!</p>
                </Alert>
            </Row>
        </ContentViewLayout>
    )
}