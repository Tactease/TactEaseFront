import { useState, useEffect } from "react";
import { getSoldierByClassId } from "../../API/soldiers.api.js";
import { AllRequestContainer } from "../MobileContainer/MobileContainer.styled.js";
import MobileReqContainer from "../../components/MobileContainer/MobileContainer.jsx";
import RequestMobile from "./RequestMobile.jsx";

const SoldierRequestsMobile = ({ user }) => {
    const [soldiers, setSoldiers] = useState([]);
    const [selectedSoldier, setSelectedSoldier] = useState(null);
    console.log("selected soldier", selectedSoldier)

    useEffect(() => {
        getSoldierByClassId(user.depClass.classId).then((data) => {
            const result = data.data;
            let soldiersData = [];
            for (let i = 0; i < result.length; i++) {
                let requestStatus = false;
                const requests = result[i].requestList;
                if (requests.length > 0) {
                    for (let j = 0; j < requests.length; j++) {
                        if (requests[j].status === "Pending") {
                            requestStatus = true;
                        }
                    }
                }

                if (result[i].pakal !== "COMMANDER") {
                    let newSoldier = {
                        _id: result[i]._id,
                        depClass: result[i].depClass,
                        personalNumber: result[i].personalNumber,
                        fullName: result[i].fullName,
                        pakal: result[i].pakal,
                        requestList: result[i].requestList,
                        requestStatus: requestStatus
                    }
                    soldiersData.push(newSoldier);
                }
            }
            setSoldiers(soldiersData);
        });
    }, []);

    const handleSoldierClick = (soldier) => {
        setSelectedSoldier(prevSoldier => (prevSoldier && prevSoldier._id === soldier._id ? null : soldier));
    }

    const filteredSoldiers = soldiers.filter(soldier => soldier.requestStatus === true)

    return (
        <AllRequestContainer>
        {filteredSoldiers.map((soldier) => (
            <MobileReqContainer
                key={soldier._id}
                user={user}
                soldier={soldier}
                onClick={() => handleSoldierClick(soldier)}
                display={selectedSoldier && selectedSoldier._id === soldier._id}
            />
        ))}
        {selectedSoldier && (
            <RequestMobile user={user} soldier={selectedSoldier} />
        )}
    </AllRequestContainer>

    )
};

export default SoldierRequestsMobile;
