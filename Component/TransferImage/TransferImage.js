const TransferImage = async (Image) => {
    try {
      const resposneJSON = await fetch(`${global.domainName}/cricbuddyAPI/api/ImageTransfer/`, {
        method: 'POST',
        headers: {
          "Accept": 'application/json',
          'Content-Type': 'application/json',
          "Authorization":"FF7B5E5C-A468-4CE0-B812-98008627C8KT",
        },
        body: JSON.stringify({
          ImageDeatile:Image,
          OldFloderName:"temp",
          NewFloderName:"UserProfile",
        })
      }).then((response) => response.json())
      .then((json) => {
    /*-------------------- Page Call -----------------------*/
    var BindData = JSON.parse(json);
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
    } catch (error) {
      alert(error)
      return

    } finally {
      
    }
  }

  export default TransferImage;