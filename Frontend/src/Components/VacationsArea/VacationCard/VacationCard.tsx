import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { formatDateCard } from "../../../Hooks/FormatDates";
import { VacationModel } from "../../../Models/VacationModel";
import { AppState } from "../../../Redux/AppState";
import DeleteButton from "../Buttons/DeleteButton/DeleteButton";
import EditButton from "../Buttons/EditButton/EditButton";
import LikeButton from "../Buttons/LikeButton/LikeButton";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import "./VacationCard.css";
import { Chip } from "@mui/joy";

interface VacationCardProps {
  vacation: VacationModel;
}

const VacationCard: React.FC<VacationCardProps> = ({
  vacation,
}): JSX.Element => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const currentUser = useSelector((appState: AppState) => appState.user);
  const {
    id: vacationId,
    destination,
    description,
    startDate,
    endDate,
    imageUrl,
    price,
    isLiked,
    likesCount,
  } = vacation;

  const isAdmin = currentUser.roleId === 1;
  const isUser = currentUser.roleId === 2;

  const generateRandomNumber = useMemo(() => {
    return Math.floor(Math.random() * 12) + 1;
  }, []);

  return (
    <div className="CardContainer">
      <Box>
        <Card
          className="VacationCard"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="ImageContainer">
            <img src={imageUrl} loading="lazy" alt="vacation" />
          </div>
          <div>
            <Typography level="h4">{destination}</Typography>
            <Typography level="body-sm">
              {formatDateCard(startDate)} - {formatDateCard(endDate)}
            </Typography>
            {isUser && (
              <LikeButton
                isLiked={!isLiked}
                likesCount={likesCount}
                vacationId={vacationId}
                userId={currentUser.id}
              />
            )}
            {isAdmin && (
              <div>
                <DeleteButton
                  vacationId={vacationId}
                  destination={destination}
                />
                <EditButton vacationId={vacationId} />
              </div>
            )}
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <div
                className={isHovered ? "DescriptionContainer" : "Description"}
              >
                <Typography level="body-sm">
                  {isHovered
                    ? description
                    : description.slice(0, 95) +
                      (description.length > 95 ? ".." : "")}
                </Typography>
              </div>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                level="title-md"
                sx={{ fontWeight: "md", marginTop: 2, textAlign: "center" }}
                endDecorator={
                  <Chip
                    component="span"
                    size="sm"
                    variant="outlined"
                    color="success"
                  >
                    Lowest price
                  </Chip>
                }
              >
                {+price}$
              </Typography>
            </Box>
            <Typography
              level="body-sm"
              className={generateRandomNumber < 5 ? "randomNumberRed" : ""}
            >
              (Only <b>{generateRandomNumber}</b> left!)
            </Typography>
          </div>
        </Card>
      </Box>
    </div>
  );
};

export default VacationCard;
