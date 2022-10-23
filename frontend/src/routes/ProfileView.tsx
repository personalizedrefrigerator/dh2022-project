import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import fetchRoute from "../api/fetchRoute";
import { UserData } from "../helper/types";
import useData from "../helper/useData";

interface ProfileViewProps {
    username?: string;
}

const ProfileView = ({ username }: ProfileViewProps) => {
    const [ user, setUser ] = useState<UserData|null>(null);

    useEffect(() => {
        const getUser = async () => {
            const route = username ? `/users/${username}` : '/my-profile';
            const data = await fetchRoute(route);
            setUser(data as UserData);
        };
        getUser();
    }, [setUser]);

    return (
        <Container>
            <HeaderSection>
                <ProfilePhoto />
                <ProfileInfo>
                    <Name>{`${user?.firstName} ${user?.lastName}`}</Name>
                    <div>
                        <div>{username}</div>
                        <a href="/">{user?.email}</a>
                    </div>
                </ProfileInfo>
            </HeaderSection>
            <AboutMeSection>
                <span>About Me</span>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac tortor dignissim convallis aenean et tortor. Pulvinar sapien et ligula ullamcorper malesuada proin. Risus nec feugiat in fermentum. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus. Nunc pulvinar sapien et ligula ullamcorper malesuada. Parturient montes nascetur ridiculus mus mauris vitae. Amet volutpat consequat mauris nunc congue nisi vitae. A condimentum vitae sapien pellentesque habitant morbi tristique. Id neque aliquam vestibulum morbi blandit cursus risus at. Sit amet purus gravida quis blandit turpis. Malesuada proin libero nunc consequat interdum. Donec enim diam vulputate ut. Cursus risus at ultrices mi. Nec nam aliquam sem et tortor consequat id porta nibh. Quam lacus suspendisse faucibus interdum. Netus et malesuada fames ac turpis. Sit amet nulla facilisi morbi tempus iaculis urna id volutpat.</p>
                <p>Etiam sit amet nisl purus. Egestas purus viverra accumsan in nisl. Ipsum dolor sit amet consectetur adipiscing elit ut aliquam purus. Vulputate odio ut enim blandit volutpat maecenas volutpat blandit. Dignissim cras tincidunt lobortis feugiat vivamus. Mauris sit amet massa vitae. Eu non diam phasellus vestibulum lorem sed risus ultricies tristique. Scelerisque varius morbi enim nunc faucibus a pellentesque. Magna ac placerat vestibulum lectus mauris ultrices. Neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing. Cras fermentum odio eu feugiat pretium nibh. Et netus et malesuada fames ac turpis egestas integer eget. Volutpat ac tincidunt vitae semper quis. Pellentesque id nibh tortor id. Nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Ultrices eros in cursus turpis massa. Non tellus orci ac auctor augue mauris augue neque gravida.</p>
                <p>Commodo viverra maecenas accumsan lacus vel facilisis volutpat est velit. Nam aliquam sem et tortor consequat id porta nibh. Sed tempus urna et pharetra pharetra massa. At risus viverra adipiscing at in tellus. Habitasse platea dictumst quisque sagittis purus sit. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Commodo ullamcorper a lacus vestibulum sed arcu non. Nam libero justo laoreet sit. Nascetur ridiculus mus mauris vitae ultricies leo integer. Amet mauris commodo quis imperdiet massa.</p>
            </AboutMeSection>
        </Container>
    );
};

export default ProfileView;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
    row-gap: 16px;
`;

const HeaderSection = styled.section`
    display: flex;
    justify-content: flex-start;
    column-gap: 16px;
`;

const ProfilePhoto = styled.div`
    height: 192px;
    width: 160px;
    background-color: navy;
`;

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Name = styled.span`
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 8px;
`;

const AboutMeSection = styled.section`
    display: flex;
    flex-direction: column;

    span {
        font-size: 18px;
        font-weight: bold;
    }
`;
