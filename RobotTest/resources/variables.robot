
*** Variables ***

# LocalHost URL and Browser  //http://localhost:5173
${URL}    https://dormdeal-project.vercel.app
${BROWSER}    chrome


# //Google OAuth credentials
${GOOGLE_USERNAME}    654259002
${GOOGLE_PASSWORD}    1730201408866

# //Button Want To Sell&& Want To Buy
${Want-To-Sell}    xpath=//*[@data-test="post-type-wts"]
${Want-To-Buy}    xpath=//*[@data-test="post-type-wtb"]


# Categories and Subcategories
${CATEGORY_DROPDOWN}   xpath=//*[@data-test="category"]
${MAIN_CATEGORY}    67ee888655b50d41195bca16
${SUB_CATEGORY_DROPDOWN}    xpath=//*[@data-test="subcategory"]
${SUB_CATEGORY}    67ee88a355b50d41195bca22


# //Create A Product
${product_name}    Air Jordan 1 mid light smoke grey
${maincategory}    เสื้อผ้าและแฟชั่น 
${subcategory}    รองเท้า
${price}    3200
${description}    เป็นลอยนิดหน่อยเก็บนานไป
${condition}    xpath=//*[@data-test="used-acceptable"]
${announcement_post_type}    xpath=//*[@data-test="postfree"]
${submitbutton}     xpath=//*[@data-test="submit-post"] 





# //Image Paths
${Post_IMAGE_PATH}     https://firebasestorage.googleapis.com/v0/b/loykratongse-85138.appspot.com/o/SE-Shop%2FURL-Images-Tester%2FAirJordan1.jpg?alt=media&token=24087c7e-97d1-4b4d-a998-92eb2fb570a5


# ${LOCAL_IMAGE_PATH}    D:/Programming/Term1ProjectFinal/Test-Project/Dormdeal-Project-Testing/resources/images/AirJordan1.jpg
# ${LOCAL_IMAGE_PATH2}    D:/Programming/Term1ProjectFinal/Test-Project/Dormdeal-Project-Testing/resources/images/AirJordan2.jpg

${LOCAL_IMAGE_PATH}    ${CURDIR}/images/AirJordan1.jpg
${LOCAL_IMAGE_PATH2}   ${CURDIR}/images/AirJordan2.jpg




# //Profile
${profile}    xpath=//*[@data-test="profile-button"]
${my_announcement}    xpath=//*[@data-test="my-announcement"]

# //IconEditPost -- ตามด้วย ID Post ที่เราต้องการที่จะ Edit 
${icon_edit_post}    xpath=//*[@data-test="icon-edit-post-68a2e3798029d08f61d57336"]
${icon_delete_post}   xpath=//*[@data-test="icon-delete-post-68a5705fbb3e6882a83a18e7"]
${icon_edit_post2}    xpath=//*[@data-test="icon-edit-post-68a2e5228029d08f61d57383"]





# //Sweetalert
${swal2postsuccess}    xpath=//*[@data-test="swal-post-success"] 
${swal2postfailed}    xpath=//*[@data-test="swal-post-failed"]
${swal2updatepostsuccess}    xpath=//*[@data-test="swal-post-update-success"]
${swal2cancelupdatepost}    xpath=//*[@data-test="swal-post-cancel-update-success"]
${swal2confirmcancelupdatepost}    xpath=//*[@data-test="swal-post-confirm-cancelupdate"]
${swal2deletepost}    xpath=//*[@data-test="swal-post-delete"]
${swal2confirmdeletepost}    xpath=//*[@data-test="swal-post-confirm-delete"]



# //เช็คว่าไปหน้านั้นจริงๆเจอหัวข้อนี้จริงๆ
${checkheading}    xpath=//*[@data-test="header-edit-productdetails"]



# //ButtonEditPost
${submitcancelupdatepost}    xpath=//*[@data-test="submit-cancel-update-post"]


${editproductdetails}    xpath=//*[@data-test="edit-productdetails"]
${editprice}    xpath=//*[@data-test="edit-price"]
${submitupdatepost}    xpath=//*[@data-test="submit-update-post"]






# DetailsEditPost
${price_edit}    65000