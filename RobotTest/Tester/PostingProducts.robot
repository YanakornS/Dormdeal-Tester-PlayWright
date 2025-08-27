*** Settings ***
Library    SeleniumLibrary
Resource   ../resources/variables.robot
Resource   ../resources/keywords.robot



*** Test Cases ***
(TC7001) การเพิ่มโพสต์สินค้าสำเร็จ
    [Documentation]    Test adding product posts on the DormDeal website from the login process to the successful submission of the post.
    Open WebBrowser 
    Maximize Browser Window
    Login With Google OAuth    ${GOOGLE_USERNAME}    ${GOOGLE_PASSWORD}
    PostButton
    SelectTheOfferButton
    ProductName
    SelectCategory
    SelectSubCategory
    SelectImages
    Price
    Description
    Condition
    Announcement Post Type
    SubmitPost
    CheckPostSuccess    (TC7001)   
    Close Browser

(TC7002) การเพิ่มโพสต์สินค้าไม่สำเร็จ(กรณีไม่เลือกข้อเสนอ)
    [Documentation]    Test posting failure when user does not select an offer type; system should show error message
    Open WebBrowser 
    Maximize Browser Window
    Login With Google OAuth    ${GOOGLE_USERNAME}    ${GOOGLE_PASSWORD}
    PostButton
    ProductName
    SelectCategory
    SelectSubCategory
    SelectImages
    Price
    Description
    Condition
    Announcement Post Type
    SubmitPost
    CheckPostFailed    (TC7002)
    Close Browser

(TC7003) การเพิ่มโพสต์สินค้าไม่สำเร็จ(กรณีไม่กรอกชื่อสินค้า)
    [Documentation]    Test posting failure when user does not fill in the product name; system should show error message
    Open WebBrowser 
    Maximize Browser Window
    Login With Google OAuth    ${GOOGLE_USERNAME}    ${GOOGLE_PASSWORD}
    PostButton
    SelectTheOfferButton
    SelectCategory
    SelectSubCategory
    SelectImages
    Price
    Description
    Condition
    Announcement Post Type
    SubmitPost
    CheckPostFailed    (TC7003)
    Close Browser

(TC7004) การเพิ่มโพสต์สินค้าไม่สำเร็จ(กรณีไม่กรอกเลือกหมวดหมู่หลัก)
    [Documentation]    Test posting failure when user does not select main category; system should show error message
    Open WebBrowser 
    Maximize Browser Window
    Login With Google OAuth    ${GOOGLE_USERNAME}    ${GOOGLE_PASSWORD}
    PostButton
    SelectTheOfferButton
    ProductName
    SelectImages
    Price
    Description
    Condition
    Announcement Post Type
    SubmitPost
    CheckPostFailed    (TC7004)
    Close Browser

(TC7005) การเพิ่มโพสต์สินค้าไม่สำเร็จ(กรณีไม่กรอกเลือกหมวดย่อย)
    [Documentation]    Test posting failure when user does not select sub-category; system should show error message
    Open WebBrowser 
    Maximize Browser Window
    Login With Google OAuth    ${GOOGLE_USERNAME}    ${GOOGLE_PASSWORD}
    PostButton
    SelectTheOfferButton
    ProductName
    SelectImages
    Price
    Description
    Condition
    Announcement Post Type
    SubmitPost
    CheckPostFailed    (TC7005)
    Close Browser


(TC7006) การเพิ่มโพสต์สินค้าไม่สำเร็จ(กรณีไม่ใส่รูป)
    [Documentation]    Test posting failure when user does not upload image; system should show error message
    Open WebBrowser 
    Maximize Browser Window
    Login With Google OAuth    ${GOOGLE_USERNAME}    ${GOOGLE_PASSWORD}
    PostButton
    SelectTheOfferButton
    ProductName
    SelectCategory
    SelectSubCategory
    Price
    Description
    Condition
    Announcement Post Type
    SubmitPost
    CheckIMAGESUPLOAD    (TC7006)
    Close Browser




(TC7007) การเพิ่มโพสต์สินค้าไม่สำเร็จ(กรณีไม่ใส่ราคา)
    [Documentation]    Test posting failure when user does not input price; system should show error message
    Open WebBrowser 
    Maximize Browser Window
    Login With Google OAuth    ${GOOGLE_USERNAME}    ${GOOGLE_PASSWORD}
    PostButton
    SelectTheOfferButton
    ProductName
    SelectCategory
    SelectImages
    Description
    Condition
    Announcement Post Type
    SubmitPost
    CheckPostFailed    (TC7007)
    Close Browser


(TC7008) การเพิ่มโพสต์สินค้าไม่สำเร็จ(กรณีไม่ใส่คำอธิบาย)
    [Documentation]    Test posting failure when user does not input description; system should show error message
    Open WebBrowser 
    Maximize Browser Window
    Login With Google OAuth    ${GOOGLE_USERNAME}    ${GOOGLE_PASSWORD}
    PostButton
    SelectTheOfferButton
    ProductName
    SelectCategory
    SelectImages
    Price
    Condition
    Announcement Post Type
    SubmitPost
    CheckPostFailed    (TC7008)
    Close Browser


(TC7009) การเพิ่มโพสต์สินค้าไม่สำเร็จ(กรณีไม่เลือกสภาพสินค้า)
    [Documentation]    Test posting failure when user does not select product condition; system should show error message
    Open WebBrowser 
    Maximize Browser Window
    Login With Google OAuth    ${GOOGLE_USERNAME}    ${GOOGLE_PASSWORD}
    PostButton
    SelectTheOfferButton
    ProductName
    SelectCategory
    SelectImages
    Price
    Description
    Announcement Post Type
    SubmitPost
    CheckPostFailed    (TC7009)
    Close Browser

        
(TC7010) การเพิ่มโพสต์สินค้าไม่สำเร็จ(กรณีไม่เลือกเลือกประเภทประกาศโพสต์)
    [Documentation]    Test posting failure when user does not select announcement post type; system should show error message
    Open WebBrowser 
    Maximize Browser Window
    Login With Google OAuth    ${GOOGLE_USERNAME}    ${GOOGLE_PASSWORD}
    PostButton
    SelectTheOfferButton
    ProductName
    SelectCategory
    SelectImages
    Price
    Description
    Condition
    SubmitPost
    CheckPostFailed    (TC7010)
    Close Browser

(TC7011) การแก้ไขโพสต์ประกาศซื้อขายสินค้า
    [Documentation]    Test Verify that a user can successfully edit an existing product post by updating the price and submitting the changes. 
    Open WebBrowser 
    Maximize Browser Window
    Login With Google OAuth    ${GOOGLE_USERNAME}    ${GOOGLE_PASSWORD}
    ProfileButton
    Click My Announcement
    IconEditPost
    EditPrice
    SubmitUpdatePost
    CheckPostUpdateSuccess    (TC7011)
    Close Browser
    
(TC7012) การแก้ไขโพสต์ประกาศซื้อขายสินค้า(กดยกเลิกไม่ต้องการเเก้ไข)    
    [Documentation]    Test Verify that a user can cancel the edit of an existing product post without making any changes.
    Open WebBrowser 
    Maximize Browser Window
    Login With Google OAuth    ${GOOGLE_USERNAME}    ${GOOGLE_PASSWORD}
    ProfileButton
    Click My Announcement
    IconEditPost2
    CancelUpdatePost
    CheckPostCancelUpdate    (TC7012)
    Close Browser


(TC7013) การลบโพสต์ประกาศซื้อขายสินค้า
    [Documentation]    Test Verify that a user can successfully delete an existing product post and confirm  
    Open WebBrowser 
    Maximize Browser Window
    Login With Google OAuth    ${GOOGLE_USERNAME}    ${GOOGLE_PASSWORD}
    ProfileButton
    Click My Announcement
    IconDeletePost
    CheckPostConfirmDelete    (TC7013)
    Close Browser


  










