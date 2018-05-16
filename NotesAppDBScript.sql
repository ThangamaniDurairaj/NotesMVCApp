
CREATE TABLE tblRegister(
    FirstName    VARCHAR (20) NULL,
    LastName    VARCHAR (20) NULL,
    Gender   VARCHAR (20) NULL,
    BirthDate      VARCHAR (20) NULL,
    Aadhar   VARCHAR (20) NULL,
    MobileNumber   VARCHAR (20) NULL,
    Address1 VARCHAR (20) NULL,
    Address2 VARCHAR (20) NULL,
    City     VARCHAR (20) NULL,
    District VARCHAR (20) NULL,
    Pin      VARCHAR (20) NULL,
    State    VARCHAR (20) NULL,
	Country     VARCHAR (20) NULL,
    Email    VARCHAR (20) NULL,
    Password VARCHAR (20) NULL
);

create proc spRegister
(
@FirstName varchar(20),
@Lastname varchar(20),
@Gender varchar(20),
@BirthDate      VARCHAR (20),
@Aadhar   VARCHAR(20),
@MobileNumber   VARCHAR(20),
@Address1 VARCHAR(20),
@Address2 VARCHAR (20),
@City     VARCHAR (20) ,
@District VARCHAR (20) ,
@Pin      VARCHAR (20) ,
@State    VARCHAR (20) ,
@Country     VARCHAR (20),
@Email    VARCHAR (20), 
@Password VARCHAR (20) 
)
as
begin 
if not exists(select * from tblRegister where Email=@Email)
begin
insert into tblRegister(FirstName,LastName,Gender,BirthDate,Aadhar,MobileNumber,Address1,Address2,City,District,Pin,State,Country,Email,Password) 
values (@FirstName,@Lastname,@Gender,@BirthDate,@Aadhar,@MobileNumber,@Address1,@Address2,@City,@District,@Pin,@State,@Country,@Email,@Password)
end
else
begin
raiserror('user already exists',11,1)
end
end 
go
