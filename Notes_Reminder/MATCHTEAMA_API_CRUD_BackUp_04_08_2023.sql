USE [cricbuddy]
GO
/****** Object:  StoredProcedure [dbo].[MATCHTEAMA_API_CRUD]    Script Date: 8/4/2023 9:01:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ======================================================================================================================
-- Author: krutarth bhavsar
-- Create Date: 06-01-2023
-- Description: 
-- ======================================================================================================================

-- Modified By: Name:            Date:    Description:

-- =============================================================================================================


ALTER PROCEDURE [dbo].[MATCHTEAMA_API_CRUD] (@Inputstring xml) AS
    BEGIN
        DECLARE @Operation varchar(10),
                @Success bit = 0,
                @ResponseXml xml,
                @EmpID int = 0,
                @StoredProcedure varchar(50) = 'MATCHTEAMA_API_CRUD'
				
				
				,@TeamAid int
				,@TeamAName varchar(100)
				,@Matchid int
				,@MobileNo varchar(20)
				,@Bowlerid int
				,@BowlerName varchar(100)
				,@BowlingSide varchar(100)
				,@Streakerid int
				,@StreakeName varchar(100)
				,@Runnerid int
				,@RunnerName varchar(100)	
				,@Bowle decimal(18,1)
				,@BowleOver int
				,@Run int
				,@FourS bit
				,@SixS bit
				,@OutBatterid int
				,@OutBatterType varchar(100)
				,@OutByBowlerid int
				,@OutByBowlerName varchar(100)
				,@Description varchar(max)
				,@BowlerPlayerid int
				,@StickerPlayerid int
				,@RunnerPlayerid int
				,@TotalOver int
				,@BowleCount int
				,@BowlerWiseBallCount decimal(18,1)
				,@NextOver varchar(10) = 'false'
				,@Type varchar(50)
				,@NoBallchecked varchar(20)
				,@WideBallRun int
				,@NoBallRun int
				,@MatchInningid int
				,@NextInning varchar(10) = 'false'
				,@BowlerOut int = 0
				,@Out int = 0
				,@MatchTeamAid int
				,@MatchTeamAid_undo int
				,@Description1 varchar(max) 
				,@OutDeliveryType varchar(50)
				,@Fielderid2 int
				,@FielderName2 varchar(100)
				,@DirectHit bit
				,@FlagBatterType varchar(10)
				,@RetiredHurt bit
				,@CountBall int = 0
				,@WagonWeel varchar(200)
				,@ShortType varchar(200)
				,@Playerid int
				,@Name varchar(100)
				,@BattingStyle varchar(100)
		BEGIN TRY	
		
          SELECT @Operation = t.SERVICEREQUEST.value('OPER[1]','varchar(10)'),
		  
		  @FlagBatterType = t.SERVICEREQUEST.value('FLAGBATTERTYPE[1]','varchar(10)'),
		  @TeamAid = t.SERVICEREQUEST.value('TEAMAID[1]','int'),
		  @TeamAName = t.SERVICEREQUEST.value('TEAMANAME[1]','varchar(100)'),
		  @Matchid = t.SERVICEREQUEST.value('MATCHID[1]','int'),
		  @MobileNo = t.SERVICEREQUEST.value('MOBILENO[1]','varchar(20)'),
		  @Bowlerid = t.SERVICEREQUEST.value('BOWLERID[1]','int'),
		  @BowlerName = t.SERVICEREQUEST.value('BOWLERNAME[1]','varchar(100)'),
		  @BowlerPlayerid = t.SERVICEREQUEST.value('BOWLERPLAYERID[1]','int'),
		  @BowlingSide = t.SERVICEREQUEST.value('BOWLINGSIDE[1]','varchar(100)'),
		  @Streakerid = t.SERVICEREQUEST.value('STREAKERID[1]','int'),
		  @StreakeName = t.SERVICEREQUEST.value('STREAKENAME[1]','varchar(100)'),
		  @StickerPlayerid = t.SERVICEREQUEST.value('STICKERPLAYERID[1]','int'),
		  @Runnerid = t.SERVICEREQUEST.value('RUNNERID[1]','int'),
		  @RunnerName = t.SERVICEREQUEST.value('RUNNERNAME[1]','varchar(100)'),
		  @RunnerPlayerid = t.SERVICEREQUEST.value('RUNNERPLAYERID[1]','int'),
		  @Bowle = t.SERVICEREQUEST.value('BOWLE[1]','decimal(18,2)'),
		  @BowleOver = t.SERVICEREQUEST.value('BOWLEOVER[1]','int'),
		  @Run = t.SERVICEREQUEST.value('RUN[1]','int'),
		  @FourS = t.SERVICEREQUEST.value('FOURS[1]','bit'),
		  @SixS = t.SERVICEREQUEST.value('SIXS[1]','bit'),
		  @Type = t.SERVICEREQUEST.value('TYPE[1]','varchar(50)'),
		  @OutBatterid = t.SERVICEREQUEST.value('OUTBATTERID[1]','int'),
		  @OutBatterType = t.SERVICEREQUEST.value('OUTBATTERTYPE[1]','varchar(100)'),
		  @OutByBowlerid = t.SERVICEREQUEST.value('OUTBYBOWLERID[1]','int'),
		  @OutByBowlerName = t.SERVICEREQUEST.value('OUTBYBOWLERNAME[1]','varchar(100)'),
		  @Description = t.SERVICEREQUEST.value('DESCRIPTION[1]','varchar(max)'),
		  @TotalOver = t.SERVICEREQUEST.value('TOTALOVER[1]','int'),
		  @BowleCount = t.SERVICEREQUEST.value('BOWLECOUNT[1]','int'),
		  @BowlerWiseBallCount = t.SERVICEREQUEST.value('BOWLERWISEBALLCOUNT[1]','decimal(18,1)'),
		  @NoBallchecked = t.SERVICEREQUEST.value('NOBALLCHECKED[1]','varchar(100)'),
		  @WideBallRun = t.SERVICEREQUEST.value('WIDEBALLRUN[1]','int'),
		  @NoBallRun = t.SERVICEREQUEST.value('NOBALLRUN[1]','int'),
		  @MatchInningid = t.SERVICEREQUEST.value('MATCHINNINGID[1]','int'),
		  @MatchTeamAid = t.SERVICEREQUEST.value('MATCHTEAMAID[1]','int'),
		  @MatchTeamAid_undo = t.SERVICEREQUEST.value('MATCHTEAMAID_UNDO[1]','int'),
		  @OutDeliveryType = t.SERVICEREQUEST.value('OUTDELIVERYTYPE[1]','varchar(50)'),
		  @Fielderid2 = t.SERVICEREQUEST.value('FIELDERID2ID[1]','int'),
		  @FielderName2 = t.SERVICEREQUEST.value('FIELDERNAME2[1]','varchar(100)'),
		  @DirectHit = t.SERVICEREQUEST.value('DIRECTHIT[1]','bit'),
		  @RetiredHurt = t.SERVICEREQUEST.value('RETIREDHURT[1]','bit'),
		  @CountBall = t.SERVICEREQUEST.value('COUNTBALL[1]','int'),
		  @WagonWeel = t.SERVICEREQUEST.value('WAGONWEEL[1]','varchar(200)'),
		  @ShortType = t.SERVICEREQUEST.value('SHORTTYPE[1]','varchar(200)')

		  

          FROM @Inputstring.nodes('/SERVICEREQUEST') as t(SERVICEREQUEST)
		  
		  DELETE FROM DeveloperError 
		  INSERT INTO DeveloperError values (@Inputstring,'MATCHTEAMA_API_CRUD')
		  
          ---------- Validation for Unique record before edit or add the details --------------------------------------------------------------

		  SELECT @Playerid = Playerid FROM MatchTeamAPlayer where MatchTeamAPlayerid = @Streakerid
		  SELECT @Name = Name , @BattingStyle = BattingStyle from Player  where Playerid = @Playerid


          IF ((@Operation= 'add') )
	      BEGIN
			IF(@BowleCount < 6)
			BEGIN
				IF (@CountBall != 0)
				BEGIN
					SELECT @BowleCount = 0
				END
				ELSE IF(@Type = 'Main' OR @Type = 'ByeBall' OR @Type = 'RunningScored' OR @Type = 'Out' OR @Type = 'LegByeBall')
				BEGIN
					SELECT @BowleCount = @BowleCount + 1;
				END
				ELSE 
				BEGIN
					SELECT @BowleCount = 0
				END

				SELECT @Bowle = @Bowle + 0.1

				

				select @BowlerWiseBallCount = @BowlerWiseBallCount + 0.1

				/*---------------------- This calculation Out and Run_Out Calculation --------------------*/
				IF(@OutDeliveryType = 'WideBall')
				BEGIN
					SELECT @BowleCount = @BowleCount - 1;
					select @BowlerWiseBallCount = @BowlerWiseBallCount - 0.1
					SELECT @Bowle = @Bowle - 0.1
				END
				/*---------------------- This calculation Out and Run_Out Calculation --------------------*/
				
				IF(@BowleCount = 6)
				BEGIN
					
					SELECT @Bowle =  @BowleOver
					--select @BowlerWiseBallCount =  @BowleOver
										
					SELECT * 
					INTO #Temp_MaidanCalCulate FROM (
					SELECT BowleOver,SUM(Run) AS RUN FROM MatchTeamA where Matchid = @Matchid and Bowlerid = @Bowlerid
					GROUP BY BowleOver 
					) A1


					select @BowlerWiseBallCount = COUNT(1) from #Temp_MaidanCalCulate 
					DROP TABLE #Temp_MaidanCalCulate 
					
					select @NextOver = 'true'
				END

				
				--IF(@BowleOver = 0 OR @BowleOver = 6)
				IF(@BowleOver = 0)
				BEGIN
					SELECT @BowleOver = @BowleOver + 1
				END

			END
			ELSE 
			BEGIN
				SELECT @BowleOver = @BowleOver + 1
				select @NextOver = 'true'
			END
			
			--IF(@Type = 'NoBall')
			--BEGIN
			--	SELECT @BowleCount =  1;
			--END
			
			DECLARE @Matc_FlagBatterType varchar(200)
			SELECT @Matc_FlagBatterType = @FlagBatterType;
			IF(@Run % 2 != 0)
			BEGIN 
				IF(@Type IN ('Main'))
				BEGIN
					IF(@Matc_FlagBatterType = 'Sticker')
					BEGIN 
						SELECT @Matc_FlagBatterType = 'Runner'
					END
					ELSE 
					BEGIN
						SELECT @Matc_FlagBatterType = 'Sticker'
					END
				END
				IF(@Type IN ('ByeBall','LegByeBall'))
				BEGIN
					IF(@Matc_FlagBatterType = 'Sticker')
					BEGIN
						SELECT @Matc_FlagBatterType = 'Sticker'
					END
					ELSE 
					BEGIN
						SELECT @Matc_FlagBatterType = 'Runner'
					END
				END
				IF(@BowleCount = 6 AND @Type NOT IN ('ByeBall','LegByeBall'))
				BEGIN
					IF(@Run % 2 != 0)
					BEGIN
						SELECT @Matc_FlagBatterType = 'Sticker'
					END
					ELSE 
					BEGIN
						SELECT @Matc_FlagBatterType = 'Runner'
					END
				END
				update Match set FlagBatter = @Matc_FlagBatterType where Matchid = @Matchid
			END 
			ELSE 
			BEGIN 
				IF(@Type IN ('WideBall','NoBall'))
				BEGIN
					IF(@Matc_FlagBatterType = 'Sticker')
					BEGIN 
						SELECT @Matc_FlagBatterType = 'Runner'
					END
					ELSE 
					BEGIN
						SELECT @Matc_FlagBatterType = 'Sticker'
					END
				END
				IF(@Type IN ('ByeBall','LegByeBall'))
				BEGIN
					IF(@Matc_FlagBatterType = 'Sticker')
					BEGIN
						SELECT @Matc_FlagBatterType = 'Runner'
					END
					ELSE 
					BEGIN
						SELECT @Matc_FlagBatterType = 'Sticker'
					END
				END
				IF(@BowleCount = 6 AND @Type NOT IN ('ByeBall','LegByeBall'))
				BEGIN
					IF(@Run % 2 != 0)
					BEGIN
						SELECT @Matc_FlagBatterType = 'Sticker'
					END
					ELSE 
					BEGIN
						SELECT @Matc_FlagBatterType = 'Runner'
					END
				END
				update Match set FlagBatter = @Matc_FlagBatterType where Matchid = @Matchid
			END
			

			/*----------------------------- Insert MatchTeamA_ScoreBoard table -----------------------------*/
			DECLARE @TEMP_Description varchar(Max) = @BowlerName + ' To ' +@StreakeName + ', '+ 
			CASE WHEN @Type = 'WideBall' THEN 'Wide' +
					CASE WHEN @WideBallRun = 1 THEN ', 1 run' 
						WHEN @WideBallRun > 1 THEN + ', ' +CAST(@WideBallRun as varchar(10)) + ' runs'
						ELSE ''
					 END
				WHEN @Type = 'NoBall' THEN ' No Ball ' +
					CASE WHEN @NoBallRun = 1 THEN ', 1 run ,' 
						WHEN @NoBallRun > 1 THEN + ', ' +CAST(@NoBallRun as varchar(10)) + ' runs ,'
						ELSE ''
					 END
					 + CASE WHEN @NoBallchecked = 'Bye' THEN 'bye'
							WHEN @NoBallchecked = 'Leg_Bye' Then 'LegBy'
							ELSE ''
						END
				WHEN @Type = 'ByeBall' THEN ' bye'+
					CASE WHEN @Run = 1 THEN ', 1 run' 
						WHEN @Run > 1 THEN + ', ' +CAST(@Run as varchar(10)) + ' runs'
					 END
				WHEN @Type = 'LegByeBall' THEN ' Leg Bye'+
					CASE WHEN @Run = 1 THEN ', 1 run' 
						WHEN @Run > 1 THEN + ', ' +CAST(@Run as varchar(10)) + ' runs'
					 END
				WHEN @Type = 'Out' THEN 'Out ' +
					CASE WHEN @OutBatterType IN ('CaughtBowled','Caught') THEN ',Caught by ' + @BowlerName + ', '
					WHEN  @OutBatterType = 'Caught_Behind' THEN ',Caught by ' + @OutByBowlerName
					WHEN  @OutBatterType = 'RunOut' THEN 
						',Out by ' + CASE WHEN  @OutByBowlerName != ''  THEN @OutByBowlerName ELSE @FielderName2 END + ', '
						+CASE WHEN @Run = 0 THEN '' 
								WHEN @Run = 1 THEN CAST(@Run AS VARCHAR(10)) + ' run ,'
								WHEN @Run > 1 THEN CAST(@Run AS VARCHAR(10)) + ' runs ,'
								 ELSE '' END
						+CASE WHEN @OutDeliveryType = 'WideBall' THEN 'wide,' 
							  WHEN @OutDeliveryType = 'NoBall' THEN 'No Ball,' 
							  WHEN @OutDeliveryType = 'ByeBall' THEN 'bye,' 
							  WHEN @OutDeliveryType = 'LegByeBall' THEN 'Leg Bye,' 
								 ELSE '' END
					WHEN @OutBatterType = 'RetiredOut' THEN ',Out By ' + @BowlerName
					WHEN @OutBatterType = 'Absent_Hurt' THEN ',ABS'
					WHEN @OutBatterType = 'Hit_Wicket' THEN 
							CASE WHEN  @OutDeliveryType = 'WideBall' THEN ', Wide' ELSE '' END 
					WHEN @OutBatterType = 'Retired' THEN ',Retired'

				ELSE ''
				END
				
				WHEN @Type = 'Main' THEN  CAST(ISNULL(@Run,0)as varchar(10)) + ' runs,'  
			
				--@FielderName2
			ELSE CAST(ISNULL(@Run,0)as varchar(10)) + ' runs,'  END +
			+CASE WHEN @OutBatterType = 'RetiredHurt' THEN ',RETIRED HURT' ELSE '' END
			+CASE WHEN @ShortType = null OR @ShortType = '' THEN '' ELSE  @ShortType+' to ' END +ISNULL(@WagonWeel,'')
			
		
			
			/*----------------------------- Insert MatchTeamA_ScoreBoard table -----------------------------*/
			
			INSERT INTO MatchTeamA (TeamAid,TeamAName,Matchid,MobileNo,BowlerPlayerid,Bowlerid,BowlerName,BowlingSide,StickerPlayerid,Streakerid,StreakeName,RunnerPlayerid,Runnerid,RunnerName,Bowle,BowleOver,BowleCount,BowlerWiseBallCount,TotalOver,Run,FourS,SixS,Type,OutDeliveryType,WideBallRun,NoBallRun,NoBallchecked,OutBatterid,OutBatterType,OutByBowlerid,OutByBowlerName,Description,Fielderid2id,FielderName2,DirectHit,FlagBatterType,RetiredHurt,WagonWeel,ShortType)
			values (@TeamAid,@TeamAName,@Matchid,@MobileNo,@BowlerPlayerid,@Bowlerid,@BowlerName,@BowlingSide,@StickerPlayerid,@Streakerid,@StreakeName,@RunnerPlayerid,@Runnerid,@RunnerName,@Bowle,@BowleOver,@BowleCount,@BowlerWiseBallCount,@TotalOver,ISNULL(@Run,0),@FourS,@SixS,@Type,@OutDeliveryType,@WideBallRun,@NoBallRun,@NoBallchecked,@OutBatterid,@OutBatterType,@OutByBowlerid,@OutByBowlerName,@TEMP_Description,@Fielderid2,@FielderName2,ISNULL(@DirectHit,0),@FlagBatterType,ISNULL(@RetiredHurt,0),@WagonWeel,@ShortType)
			
			SELECT @MatchTeamAid = SCOPE_IDENTITY();
			/*----------------------------- Insert MatchTeamA_ScoreBoard table -----------------------------*/
			/*----------------------------- Description Update -----------------------------*/
			IF(@BowleOver >= 2)
			BEGIN
				DECLARE @TEMPCRR decimal(18,2)
				,@TEMPTOTALRUN int
				,@TEMPProjectScore int
				,@TEMP_TotalOver int

				SELECT @TEMPTOTALRUN = SUM(Run) FROM MatchTeamA where Matchid = @Matchid
				SELECT @TEMP_TotalOver = NoOfOver FROM Match where Matchid = @Matchid 
				SELECT @TEMPCRR = @TEMPTOTALRUN / @Bowle
				SELECT @TEMPCRR = CAST(@TEMPCRR AS DECIMAL(18,2))
				SELECT @TEMPProjectScore = ISNULL(@TEMPCRR,0) * @TEMP_TotalOver


				SELECT @Description = 'CRR: ' + CAST(@TEMPCRR as varchar(10)) + ' Project Score:' + CAST(@TEMPProjectScore AS VARCHAR(10)) + ' ( at '+CAST(@TEMPCRR as varchar(10))+' RPO )'
				UPDATE Match set Description = @Description
				where Matchid = @Matchid 

				UPDATE MatchInning set Description = @Description
				where Matchid = @Matchid 
				 
			END
			ELSE
			BEGIN 
			DECLARE @TEMP_TeamAName varchar(100)
				 SELECT @TEMP_TeamAName = TeamAName FROM Match where Matchid = @Matchid
				SELECT @Description = @TEMP_TeamAName + ' won the toss and elected to bat.'
			END
			/*----------------------------- Description Update -----------------------------*/

			DECLARE @TEMP_Orderid int 
			SELECT @TEMP_Orderid = MAX(Orderid) FROM MatchTeamA_ScoreBoard where Matchid = @Matchid
			SELECT @TEMP_Orderid = @TEMP_Orderid + 1
			
			DECLARE @TEMP_Bowle decimal(18,1)
			if(@BowleCount = 6)
			BEGIN
				 SELECT @TEMP_Bowle = (left(@Bowle, charindex('.', @Bowle)-1)) - 1
				 select @TEMP_Bowle = @TEMP_Bowle + 0.6
			END
			ELSE 
			BEGIN
				SELECT @TEMP_Bowle = @Bowle
			END
			Declare @Temp_Run varchar(20) 
			IF(@Type in('WideBall'))
			BEGIN 
				SELECT @Temp_Run = 'WD'
			END
			ELSE IF (@Type = 'NoBall')
			BEGIN
				SELECT @Temp_Run = 'NB'
			END
			ELSE IF (@Type = 'ByeBall')
			BEGIN 
				SELECT @Temp_Run = 'B'
			END
			ELSE IF (@Type = 'LegByeBall')
			BEGIN 
				SELECT @Temp_Run = 'LB'
			END
			ELSE IF (@Type = 'Out')
			BEGIN 
				SELECT @Temp_Run = 'W'
			END
			ELSE 
			BEGIN
				SELECT @Temp_Run = CAST(ISNULL(@Run,'0') as varchar(20))
			END
			INSERT INTO MatchTeamA_ScoreBoard (id,Playerid,PlayerName,PlayerType,PlayerStyle,Orderid,Matchid,MobileNo,Type,Run,Ball,Description,MatchTeamAPlayerid,MatchOver) 
			VALUES (@Streakerid,@Playerid,@Name,'Batter',@BattingStyle,@TEMP_Orderid,@Matchid,@MobileNo,'Run',@Temp_Run,@TEMP_Bowle,@TEMP_Description,@MatchTeamAid,@BowleOver)

			if(@BowleCount = 6)
			BEGIN
					Declare 
					@T_StickerPlayerid int
					,@T_Streakerid int
					,@T_StreakeName varchar(100)
					,@T_RunnerPlayerid int
					,@T_Runnerid int
					,@T_RunnerName varchar(100)
					,@T_BowlerPlayerid int
					,@T_Bowlerid int
					,@T_BowlerName varchar(100)
					,@T_Streaker varchar(100)
					,@T_Runner varchar(100)
					,@T_StickerPlayerid_Match int
					,@T_RunnerPlayerid_Match int
 
					
					select 
					@T_StickerPlayerid = StickerPlayerid
					,@T_Streakerid = Streakerid
					,@T_StreakeName = StreakeName
					,@T_RunnerPlayerid = RunnerPlayerid
					,@T_Runnerid = Runnerid
					,@T_RunnerName = RunnerName
					,@T_BowlerPlayerid = BowlerPlayerid
					,@T_Bowlerid = Bowlerid
					,@T_BowlerName = BowlerName
					 FROM MatchInning Where Matchid = @Matchid
 

					 SELECT 
					 @T_Streaker = Streaker
					,@T_Runner = Runner 
					,@T_StickerPlayerid_Match = StickerPlayerid
					,@T_RunnerPlayerid_Match = RunnerPlayerid
					 FROM Match Where Matchid = @Matchid

				
				--INSERT INTO MatchTeamA_ScoreBoard (Orderid,Matchid,MobileNo,Type,MatchTeamAPlayerid,MatchOver,Playerid,id,PlayerName,StickerPlayerid,Streakerid,StreakeName,RunnerPlayerid,Runnerid,RunnerName) 
				--VALUES (@TEMP_Orderid + 1,@Matchid,@MobileNo,'Deatils',@MatchTeamAid,@BowleOver,@BowlerPlayerid,@Bowlerid,@BowlerName
				--,(CASE WHEN @T_Streaker = @T_StreakeName THEN @T_StickerPlayerid ELSE @T_RunnerPlayerid END)
				--,(CASE WHEN @T_Streaker = @T_StreakeName THEN @T_Streakerid ELSE @T_Runnerid END)
				--,(CASE WHEN @T_Streaker = @T_StreakeName THEN @T_StreakeName ELSE @T_RunnerName END)
				--,(CASE WHEN @T_Runner = @T_RunnerName THEN @T_RunnerPlayerid ELSE @T_StickerPlayerid END)
				--,(CASE WHEN @T_Runner = @T_RunnerName THEN @T_Runnerid  ELSE @T_Streakerid END)
				--,(CASE WHEN @T_Runner = @T_RunnerName THEN @T_RunnerName  ELSE @T_StreakeName END)
				--)
				INSERT INTO MatchTeamA_ScoreBoard (Orderid,Matchid,MobileNo,Type,MatchTeamAPlayerid,MatchOver,Playerid,id,PlayerName,StickerPlayerid,Streakerid,StreakeName,RunnerPlayerid,Runnerid,RunnerName) 
				VALUES (@TEMP_Orderid + 1,@Matchid,@MobileNo,'Deatils',@MatchTeamAid,@BowleOver,@BowlerPlayerid,@Bowlerid,@BowlerName
				,(CASE WHEN @T_StickerPlayerid_Match = @T_StickerPlayerid THEN @T_StickerPlayerid ELSE @T_RunnerPlayerid END)
				,(CASE WHEN @T_StickerPlayerid_Match = @T_StickerPlayerid THEN @T_Streakerid ELSE @T_Runnerid END)
				,(CASE WHEN @T_StickerPlayerid_Match = @T_StickerPlayerid THEN @T_StreakeName ELSE @T_RunnerName END)
				,(CASE WHEN @T_RunnerPlayerid_Match = @T_RunnerPlayerid THEN @T_RunnerPlayerid ELSE @T_StickerPlayerid END)
				,(CASE WHEN @T_RunnerPlayerid_Match = @T_RunnerPlayerid THEN @T_Runnerid  ELSE @T_Streakerid END)
				,(CASE WHEN @T_RunnerPlayerid_Match = @T_RunnerPlayerid THEN @T_RunnerName  ELSE @T_StreakeName END)
				)
			END
			
			/*----------------------------- Insert MatchTeamA_ScoreBoard table -----------------------------*/
			/*----------------------------- Undo Processs -----------------------------*/
			IF @Bowle >= 0.1
			BEGIN 
				update MatchTeamA set 
				MatchTeamAid_undo = @MatchTeamAid_undo
				where MatchTeamAid = @MatchTeamAid

				SET @MatchTeamAid_undo = @MatchTeamAid
			END
			ELSE 
			BEGIN
				update MatchTeamA set 
				MatchTeamAid_undo = @MatchTeamAid_undo
				where MatchTeamAid = @MatchTeamAid

				SET @MatchTeamAid_undo  = 0	
			END
			
			/*----------------------------- Undo Processs -----------------------------*/

			update MatchTeamAPlayer set 
			BattingRun = ISNULL(BattingRun,0) + @Run,
			BallCount = ISNULL(BallCount,0) +  1,
			OutFlag = 0
			where MatchTeamAPlayerid = @Streakerid

			if(@Type = 'Out')
			BEGIN
				
				
				update MatchTeamAPlayer set 
					OutFlag = 1
				where MatchTeamAPlayerid = @Streakerid and Matchid = @Matchid

				declare @Playercount  int

				select @Playercount = Count(1) from MatchTeamAPlayer where Matchid = @Matchid and OutFlag = 0

				DECLARE @TotalPlayer int,@TotalPlayerOut int
				select @TotalPlayer =  Count(1) from MatchTeamAPlayer where Matchid = @Matchid
				select @TotalPlayerOut =  Count(1) from MatchTeamAPlayer where Matchid = @Matchid and OutFlag = 1


				IF ((@TotalPlayer - 1) = @TotalPlayerOut ) OR @TotalPlayerOut = 10
				BEGIN 
				 SELECT @NextInning = 'true'
				END
				ELSE 
				BEGIN 
				 SELECT @NextInning = 'false'
				END

				if(@Playercount = 1)
				Begin
					SELECT @NextInning = 'true'
				END

			END
			
			
				IF(@Type NOT IN ('WideBall','NoBall') )
				BEGIN
					IF(@Run % 2 != 0)
					BEGIN
						IF(@BowleCount = 6)
						BEGIN
							update MatchInning set 
							StickerPlayerid = @StickerPlayerid
							,Streakerid = @Streakerid
							,StreakeName = @StreakeName
							,RunnerPlayerid = @RunnerPlayerid
							,Runnerid = @Runnerid
							,RunnerName = @RunnerName
							where MatchInningid = @MatchInningid 
						END
						ELSE 
						BEGIN
							update MatchInning set 
							StickerPlayerid = @RunnerPlayerid
							,Streakerid = @Runnerid
							,StreakeName = @RunnerName
							,RunnerPlayerid = @StickerPlayerid
							,Runnerid = @Streakerid
							,RunnerName = @StreakeName
							where MatchInningid = @MatchInningid 
						END
				
					END
					ELSE
					BEGIN
						IF(@BowleCount = 6 OR @Run % 2 != 0)
						BEGIN
							update MatchInning set 
							StickerPlayerid = @RunnerPlayerid
							,Streakerid = @Runnerid
							,StreakeName = @RunnerName
							,RunnerPlayerid = @StickerPlayerid
							,Runnerid = @Streakerid
							,RunnerName = @StreakeName
							where MatchInningid = @MatchInningid 
						END
						ELSE 
						BEGIN 
							update MatchInning set 
							StickerPlayerid = @StickerPlayerid
							,Streakerid = @Streakerid
							,StreakeName = @StreakeName
							,RunnerPlayerid = @RunnerPlayerid
							,Runnerid = @Runnerid
							,RunnerName = @RunnerName
							where MatchInningid = @MatchInningid 
						END
					END
				END
				ELSE 
				BEGIN 
					IF(@Run % 2 = 0)
					BEGIN
						IF(@BowleCount = 6)
						BEGIN
							update MatchInning set 
							StickerPlayerid = @StickerPlayerid
							,Streakerid = @Streakerid
							,StreakeName = @StreakeName
							,RunnerPlayerid = @RunnerPlayerid
							,Runnerid = @Runnerid
							,RunnerName = @RunnerName
							where MatchInningid = @MatchInningid 
						END
						ELSE 
						BEGIN
							update MatchInning set 
							StickerPlayerid = @RunnerPlayerid
							,Streakerid = @Runnerid
							,StreakeName = @RunnerName
							,RunnerPlayerid = @StickerPlayerid
							,Runnerid = @Streakerid
							,RunnerName = @StreakeName
							where MatchInningid = @MatchInningid 
						END
				
					END
					ELSE
					BEGIN
						IF(@BowleCount = 6 OR @Run % 2 = 0)
						BEGIN
							update MatchInning set 
							StickerPlayerid = @RunnerPlayerid
							,Streakerid = @Runnerid
							,StreakeName = @RunnerName
							,RunnerPlayerid = @StickerPlayerid
							,Runnerid = @Streakerid
							,RunnerName = @StreakeName
							where MatchInningid = @MatchInningid 
						END
						ELSE 
						BEGIN 
							update MatchInning set 
							StickerPlayerid = @StickerPlayerid
							,Streakerid = @Streakerid
							,StreakeName = @StreakeName
							,RunnerPlayerid = @RunnerPlayerid
							,Runnerid = @Runnerid
							,RunnerName = @RunnerName
							where MatchInningid = @MatchInningid 
						END
					END
				END


			/* ---------------------- CAlCulate unto recored and store MatchInning table ------------------------------*/
			DECLARE @Cal_Run int = 0 ,@Cal_Out int = 0,@Cal_Ball decimal(18,1) = 0.0,@Cal_TOtalOver int = 0
			,@Temp_Streakerid int,@Temp_Runnerid int,@Temp_Bowlerid int
			,@Temp_StreakerRun int,@Temp_RunnerRun int,@Temp_StickerBall int,@Temp_RunnerBall int
			,@Temp_BowlingSide varchar(100)
			,@Temp_BowlerWiseBallCount decimal(18,1) = 0
			,@BowlerRun int = 0
			,@Temp_BowlerOut int = 0
			

			SELECT @Cal_Run = ISNULL(SUM(Run),0) FROM MatchTeamA where Matchid = @Matchid
			SELECT @Cal_Out = ISNULL(COUNT(1),0) FROM MatchTeamA where Type = 'Out' and Matchid = @Matchid 
			SELECT @Cal_Ball = MAX(Bowle) FROM MatchTeamA where Matchid = @Matchid and Type IN ('Main','ByeBall','LegByeBall','Out') 
			SELECT @Cal_TOtalOver = NoOfOver FROM Match where Matchid = @Matchid
			
			SELECT @Temp_Streakerid = Streakerid
			,@Temp_Runnerid = Runnerid
			,@Temp_Bowlerid = Bowlerid
			FROM MatchInning where Matchid = @Matchid

			SELECT @Temp_StreakerRun = ISNULL(SUM(Run),0) FROM MatchTeamA 
			where Matchid = @Matchid and Streakerid = @Temp_Streakerid  and Type NOT IN ('WideBall','NoBall','ByeBall','LegByeBall')
			
			SELECT @Temp_RunnerRun = ISNULL(SUM(Run),0) FROM MatchTeamA 
			where Matchid = @Matchid and Streakerid = @Temp_Runnerid  and Type NOT IN ('WideBall','NoBall','ByeBall','LegByeBall')

			SELECT @Temp_StickerBall = ISNULL(COUNT(1),0) FROM MatchTeamA 
			where Matchid = @Matchid and Streakerid = @Temp_Streakerid  and Type NOT IN ('WideBall')
			
			SELECT @Temp_RunnerBall = ISNULL(COUNT(1),0) FROM MatchTeamA 
			where Matchid = @Matchid and Streakerid = @Temp_Runnerid  and Type NOT IN ('WideBall') 

			SELECT @Temp_BowlingSide = BowlingSide FROM MatchTeamA where MatchTeamAid = @MatchTeamAid 

			SELECT @Temp_BowlerWiseBallCount = MAX(BowlerWiseBallCount) FROM MatchTeamA where Matchid = @Matchid and Bowlerid = @Bowlerid and Type IN ('Main','ByeBall','LegByeBall','Out')

			SELECT @BowlerRun = ISNULL(SUM(Run),0) FROM MatchTeamA Where  Matchid = @Matchid and Bowlerid = @Bowlerid
			
			SELECT @Temp_BowlerOut = COUNT(1) FROM MatchTeamA where Matchid = @Matchid and Bowlerid = @Bowlerid and type = 'Out' 
			--AND OutDeliveryType IS NULL
			--OR OutDeliveryType NOT IN ('WideBall','NoBall','ByeBall','LegByeBall')
			AND (
			OutBatterType NOT IN ('RunOut','Hit_TheBallTwisce') OR OutBatterType IN ('Hit_Wicket') OR OutDeliveryType NOT IN ('WideBall','NoBall') 
			)
			
			

 
			SELECt @Description1 = ISNULL(STUFF ((
				SELECT '- ' + 
				CASE 
					WHEN OutBatterType = 'Retired' THEN ' ( OTH )' 
					WHEN MT.Type = 'Main' THEN CAST(MT.Run as varchar(10)) 
					WHEN MT.Type = 'WideBall' THEN CAST((ISNULL(MT.Run,0) - 1) as varchar(10)) + ' ( WD )' 
					WHEN MT.Type = 'NoBall' THEN CAST((ISNULL(MT.Run,0) - 1) as varchar(10)) + ' ( NB )' 
					WHEN MT.Type = 'ByeBall' THEN CAST((ISNULL(MT.Run,0)) as varchar(10)) + ' ( BYE )'
					WHEN MT.Type = 'LegByeBall' THEN CAST((ISNULL(MT.Run,0)) as varchar(10)) + ' ( LB )' 
					WHEN MT.OutBatterType = 'RetiredHurt' THEN ' ( REH ) ' 
					WHEN MT.OutBatterType = 'RetiredOut' THEN ' ( REO ) ' 

					WHEN MT.Type = 'Out' THEN  
						(
						 CASE WHEN OutBatterType = 'Bowled' THEN ' ( BWL )' 
							  WHEN OutBatterType = 'Caught' THEN ' ( CAO )'
							  WHEN OutBatterType = 'Caught_Behind' THEN ' ( CAB )' 
							  WHEN OutBatterType = 'CaughtBowled' THEN ' ( CBO )' 
							  WHEN OutBatterType = 'Stumped' THEN ' ( STP )' 
							  WHEN OutBatterType = 'RunOut' THEN
								CASE WHEN OutDeliveryType = 'WideBall' THEN CASE WHEN WideBallRun >= 1 THEN ' ( RNO - ' + CAST(WideBallRun as varchar(10)) + ' WD )' ELSE  '( RNO - WD )' END 
									WHEN OutDeliveryType = 'NoBall' THEN CASE WHEN NoBallRun >= 1 THEN ' ( RNO - ' + CAST(NoBallRun as varchar(10)) + ' NB )' ELSE  '( RNO - NB )' END 
									 WHEN OutDeliveryType = 'ByeBall' THEN CASE WHEN Run >= 1 THEN ' ( RNO - ' + CAST(Run AS varchar(10)) + ' BYE )' ELSE  '( RNO - BYE )' END 
									 WHEN OutDeliveryType = 'LegByeBall' THEN CASE WHEN Run >= 1 THEN ' ( RNO - ' + CAST(Run as varchar(10)) + ' LB )' ELSE  '( RNO - LB )' END 
									ELSE '( RNO )'
								END		
							  WHEN OutBatterType = 'LBW' THEN ' ( LBW )' 	
							  WHEN OutBatterType = 'Hit_Wicket' THEN ' ( HIW )' 
							  WHEN OutBatterType = 'RunOutMankaded' THEN ' ( RNM )' 
							  WHEN OutBatterType = 'Absent_Hurt' THEN ' ( ABS )' 
							  WHEN OutBatterType = 'Hit_TheBallTwisce' THEN ' ( HBT )' 
							  WHEN OutBatterType = 'ObstructingTheField' THEN ' ( OBF )' 
							  
							  
									
						 ELSE ''
						 END
						 )
					END + ' ' 
					FROM MatchTeamA MT WITH(NOLOCK)  WHERE Matchid = @Matchid and BowleOver = @BowleOver
				FOR XML PATH ('')), 1, 1, ''
			),'')


		

			update MatchInning set 
			Run = @Cal_Run,
			Out = @Cal_Out,
			Ball = @Cal_Ball,
			TotalOver = @Cal_TOtalOver,
			StickerRun = @Temp_StreakerRun,
			StickerBall = @Temp_StickerBall,
			RunnerRun = @Temp_RunnerRun,
			RunnerBall = @Temp_RunnerBall,
			BowlerImage = ISNULL(@Temp_BowlingSide,''),
			BowlerWiseBallCount = @Temp_BowlerWiseBallCount,
			BowlerRun = @BowlerRun,
			BowlerOut = @Temp_BowlerOut,
			BowlerRunDisplay = @Description1
			where MatchInningid = @MatchInningid

			
			IF @OutDeliveryType IN('WideBall','NoBall','ByeBall','LegByeBall')
			BEGIN
				DECLARE @Out_Streaker varchar(100)
				,@Out_Runner varchar(100)
				,@Out_StickerPlayerid int
				,@Out_Streakerid int
				,@Out_StreakeName varchar(100)
				,@Out_StickerRun  int
				,@Out_StickerBall int
				,@Out_RunnerPlayerid int
				,@Out_Runnerid int
				,@Out_RunnerName varchar(100)
				,@Out_RunnerBall int
				,@Out_RunnerRun int

				select 
				@Out_Streakerid = Streakerid,
				@Out_StickerPlayerid = StickerPlayerid, 
				@Out_StreakeName = StreakeName,
				@Out_StickerRun = StickerRun,
				@Out_StickerBall = StickerRun,
				@Out_RunnerPlayerid = RunnerPlayerid,
				@Out_Runnerid = Runnerid,
				@Out_RunnerName = RunnerName,
				@Out_RunnerBall = RunnerBall,
				@Out_RunnerRun = RunnerRun
				FROM MatchInning where MatchInningid = @MatchInningid


				SELECT @Out_Streaker = Streaker
				,@Out_Runner = Runner 
				FROM MATCH where Matchid = @Matchid
				update MatchInning set
					StickerPlayerid = @Out_StickerPlayerid
					,Streakerid = @Out_Streakerid
					,StreakeName = @Out_StreakeName
					,StickerRun  = @Out_StickerRun
					,StickerBall = @Out_StickerBall
					,RunnerPlayerid = @Out_RunnerPlayerid
					,Runnerid = @Out_Runnerid
					,RunnerName = @Out_RunnerName
					,RunnerBall = @Out_RunnerBall
					,RunnerRun = @Out_RunnerRun
					where MatchInningid = @MatchInningid
			END

			/* ---------------------- CAlCulate unto recored and store MatchInning table -------------------------  7-----*/

			Select @Success = 1;


			if(@BowleCount = 6)
			BEGIN
				select @BowleCount = 0
				SELECT @BowleOver = @BowleOver + 1
				
				IF(@NextInning = 'false')
				BEGIN
					IF(@BowleOver > @TotalOver)
					BEGIN
						SELECT @NextInning = 'true'
						select @NextOver = 'false'
					END
					ELSE 
					BEGIN 
						SELECT @NextInning = 'false'
					END
				END
			END
			
			SELECT @BowlerOut = ISNULL(Count(1),0) from MatchTeamA 
			WHERE Bowlerid =  @Bowlerid AND Matchid = @Matchid and Type = 'Out' 
			--AND OutDeliveryType IS NULL
			--OR OutDeliveryType NOT IN ('WideBall','NoBall','ByeBall','LegByeBall') 
			AND (
			OutBatterType NOT IN ('RunOut','Hit_TheBallTwisce') OR OutBatterType IN ('Hit_Wicket') OR OutDeliveryType NOT IN ('WideBall','NoBall') 
			)
			
			
			select @Out = ISNULL(Count(1),0) from MatchTeamA WHERE Matchid = @Matchid and Type = 'Out' 
		  END

		  IF(@Success = 1)
			BEGIN
				SELECT @ResponseXml = '<SERVICERESPONSE><RESPONSECODE>0</RESPONSECODE>'+
				'<MATCHTEAMAID_UNDO>'+ISNULL(CAST(@MatchTeamAid_undo as varchar(10)),0)+'</MATCHTEAMAID_UNDO>'+
				'<MATCHTEAMAID>'+ISNULL(CAST(@MatchTeamAid as varchar(10)),0)+'</MATCHTEAMAID>'+
				'<NEXTINNING>'+ISNULL(CAST(@NextInning as varchar(10)),0)+'</NEXTINNING>'+
				'<BOWLECOUNT>'+ISNULL(CAST(@BowleCount as varchar(10)),0)+'</BOWLECOUNT>'+
				'<BOWLE>'+ISNULL(CAST(@Bowle as varchar(10)),0)+'</BOWLE>'+
				'<BOWLEOVER>'+ISNULL(CAST(@BowleOver as varchar(10)),0)+'</BOWLEOVER>'+
				'<BOWLERWISEBALLCOUNT>'+ISNULL(CAST(@BowlerWiseBallCount as varchar(10)),0)+'</BOWLERWISEBALLCOUNT>'+
				'<NEXTOVER>'+ISNULL(@NextOver,'false')+'</NEXTOVER>'+
				'<BOWLEROUT>'+ISNULL(CAST(@BowlerOut as varchar(10)),0)+'</BOWLEROUT>'+
				'<OUT>'+ISNULL(CAST(@Out as varchar(10)),0)+'</OUT>'+
				'<BOWLERRUNDISPLAY>'+ISNULL(CAST(@Description1 as varchar(max)),0)+'</BOWLERRUNDISPLAY>'+
				'<TEAMDESCRIPTION>'+ISNULL(CAST(@Description as varchar(max)),0)+'</TEAMDESCRIPTION>'+
				'<RUN>'+ISNULL(CAST(@Cal_Run as varchar(10)),0)+'</RUN>'+
				'<BOWLERRUN>'+ISNULL(CAST(@BowlerRun as varchar(10)),0)+'</BOWLERRUN>'+
				'<RESPONSEMESSAGE>' + [dbo].[GetResponseMessage]('SUCCESS','MatchTeamA') + '</RESPONSEMESSAGE></SERVICERESPONSE>'
			END
		  ELSE
			BEGIN
				Declare @ErrorCodeCustom varchar(8000)
				EXECUTE COMMON_CUSTOM_DATABASE_ERROR_ENTRY @Module = 'MatchTeamA', @StoredProcedure = @StoredProcedure,
														@Inputstring = @Inputstring, @ErrorMessage = 'INVALIDPARAM', @ErrorCode = @ErrorCodeCustom output

				SELECT @ResponseXml = '<SERVICERESPONSE><RESPONSECODE>-1</RESPONSECODE><RESPONSEMESSAGE>' + [dbo].[GetResponseMessage]('INVALIDPARAM','MatchTeamA') + @ErrorCodeCustom + '</RESPONSEMESSAGE></SERVICERESPONSE>'
			END

        END TRY

      BEGIN CATCH

         DECLARE @ErrorCode varchar(max)
         EXECUTE COMMON_DATABASE_ERROR_ENTRY @Module = 'MASTER', @Inputstring = @Inputstring, @ErrorCode = @ErrorCode output
         SELECT @ResponseXml = '<SERVICERESPONSE><RESPONSECODE>-1</RESPONSECODE><RESPONSEMESSAGE>' + @ErrorCode + '</RESPONSEMESSAGE></SERVICERESPONSE>'

      END CATCH

      SELECT @ResponseXml;

    END



