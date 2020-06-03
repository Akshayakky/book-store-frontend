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
        borderRadius: 0,
        [theme.breakpoints.up('md')]: {
            minWidth: 150,
        },
    },
    cardContent: {
        height: 70,
        flexGrow: 0,
    },
    price: {
        padding: 0,
        margin: 0,
        fontWeight: 'bold',
    },
}));

export default function CardData(props) {
    const classes = useStyles();
    let bookTitle;
    let bookAuthor;
    let bookPrice;
    let bookImage;
    if (props.book !== undefined) {
        bookAuthor = props.book.bookAuthor
        bookTitle = props.book.bookTitle
        bookPrice = "Rs. " + props.book.bookPrice
        bookImage = props.book.bookImage
    }
    return (
        <div style={{display: props.display}}>
            <Card className={classes.mediaContainer} style={{background: props.backgroundcolor}}>
                <CardMedia
                    className={classes.cardMedia}
                    image={bookImage}
                    title="Image title"
                    style={props.style}
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
                {props.page === "cart" ?
                    <div>
                        <br/>
                        <input defaultValue={props.quantity} onChange={props.updateQuantity}
                               style={{width: "50px", marginRight: 30}} type="number" min={1}></input>
                        <button onClick={props.onChange} style={{borderWidth: 1}}>Remove</button>
                    </div>
                    : <></>
                }
                {props.page === "summary" ?
                    <div>
                        <br/>
                        ({props.quantity})
                    </div>
                    : <></>
                }
            </CardContent>
        </div>
    );
}