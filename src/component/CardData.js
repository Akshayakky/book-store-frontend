import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    cardMedia: {
        paddingTop: '60%',
        width: '40%',
        marginTop: 15,
        marginBottom: 15,
        marginLeft: '50%',
        transform: 'translate(-50%)',
    },
    mediaContainer: {
        backgroundColor: '#f2f2f2',
        boxShadow: 'none',
        borderRadius: 0
    },
    cardContent: {
        height: 70,
        flexGrow: 0,
    },
    price: {
        padding: 0,
        margin: 0,
        fontWeight: 'bold',
    }
}));

export default function CardData(data) {
    const classes = useStyles();
    let bookTitle;
    let bookAuthor;
    let bookPrice;
    let bookImage;
    if (data.data !== undefined && data.num < data.data.length) {
        bookAuthor = data.data[data.num].bookAuthor
        bookTitle = data.data[data.num].bookTitle
        bookPrice = "Rs. " + data.data[data.num].bookPrice
        bookImage =  data.data[data.num].bookImage
    }
    return (
        <div>
            <Card className={classes.mediaContainer}>
                <CardMedia
                    className={classes.cardMedia}
                    image={bookImage}
                    title="Image title"
                />
            </Card>
            <CardContent className={classes.cardContent}>
                <Typography variant="body2" component="h2">
                    {bookTitle}
                </Typography>
                <Typography variant={"caption"} color="textSecondary" display="block">
                    {bookAuthor}
                </Typography>
                <Typography variant={"caption"} className={classes.price}>
                    {bookPrice}
                </Typography>
            </CardContent>
        </div>
    );
}