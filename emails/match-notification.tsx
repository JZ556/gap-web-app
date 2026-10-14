import { Body, Container, Head, Heading, Html, Preview, Text } from "react-email";

type MatchNotificationProps = {
  firstName: string;
  applicationNumber: string;
};

export function MatchNotification({
  firstName,
  applicationNumber,
}: MatchNotificationProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Your adoption application has been matched</Preview>
      <Body style={{ backgroundColor: "#f5f7f8", fontFamily: "Arial, sans-serif" }}>
        <Container style={{ maxWidth: 560, margin: "32px auto", padding: 32, backgroundColor: "#ffffff" }}>
          <Heading style={{ color: "#004b69", fontSize: 24, lineHeight: "32px" }}>
            Your application has been matched
          </Heading>
          <Text>Hi {firstName},</Text>
          <Text>
            Your adoption application {applicationNumber} has been matched with a greyhound.
            Please sign in to view your application status. Our team will contact you soon.
          </Text>
          <Text>Greyhound Adoption Team</Text>
          <Text style={{ color: "#64748b", fontSize: 12 }}>
            Student capstone prototype. This is not an official Greyhound Racing NSW notification.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
