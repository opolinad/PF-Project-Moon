import React from "react";


/*
    title: string,
    description: string,
    imgs: array de urls,
    shares:int,
    likes:int,
    saved:int,
    id:string,
*/

export default function CardPost(props)
{

    let cardValues={}
    props.description? cardValues.description=props.description : cardValues.description="";
    if(props.imgs){cardValues.imgs=props.imgs.map((element,index)=><img key={"img_"+index} className="cardPostImg" src={element} alt={"nu existe :c"}/>)}
    cardValues.likes=props.likes;
    cardValues.shares=props.shares;
    cardValues.saved=props.saved;

    return(
        <div>
            <h3>{props.title}</h3>
            <div className="descriptionCont">{cardValues.description}</div>
            <div className="imgsCont">{cardValues.imgs}</div>
            <div className="analiticsCont">
                {cardValues.likes}
                {cardValues.shares}
                {cardValues.saved}
                <div>Comentarios</div> {/*place holder para link a pagina completa de post*/}
            </div>
        </div>
    )
}