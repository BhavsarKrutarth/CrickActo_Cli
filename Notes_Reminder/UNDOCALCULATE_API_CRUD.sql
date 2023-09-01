USE [cricbuddy]
GO
/****** Object:  StoredProcedure [dbo].[UNDOCALCULATE_API_CRUD]    Script Date: 8/4/2023 11:51:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ======================================================================================================================
-- Author: krutarth bhavsar
-- Create Date: 27-02-2023
-- Description: 
-- ======================================================================================================================

-- Modified By: Name:            Date:    Description:

-- =============================================================================================================


ALTER PROCEDURE [dbo].[UNDOCALCULATE_API_CRUD] (@Inputstring xml) AS
    BEGIN
        DECLARE @Operation varchar(10),
                @Success bit = 0,
                @ResponseXml xml,
                @EmpID int = 0,
                @StoredProcedure varchar(50) = 'UNDOCALCULATE_API_CRUD'
				
				,@MatchTeamAid int
				,@Matchid int
				,@MatchInningid int
				,@MatchTeamAid_undo int

				,@Streakerid int 
				,@StickerPlayerid int
				,@StreakeName varchar(100)
				,@RunnerPlayerid int
				,@Runnerid int
				,@RunnerName varchar(100)
				,@BowlerPlayerid int
				,@Bowlerid int 
				,@BowlerName varchar(100)
				,@BowleCount int = 0
				,@Run int = 0
				,@Out int = 0
				,@Ball decimal(18,1) = 0.0
				,@TotalOver int = 0
				,@Description varchar(500) = ''
				,@StickerRun int = 0
				,@StickerBall int = 0
				,@RunnerBall int = 0
				,@RunnerRun int = 0
				,@BowlingSide varchar(50) = 'stump'
				,@BowlerWiseBallCount decimal(18,1) = 0.0
				,@BowlerMaidan int = 0
				,@BowlerRun int = 0 
				,@BowlerOut int = 0
				,@BowlerRunDisplay varchar(500) = ''
				,@BowleOver int = 1
				,@StickerColor varchar(50) = ''
				,@Non_StickerColor varchar(50) = ''
				,@RunDsiplay varchar(max)
				,@TeamABatterName varchar(100) = ''
				,@OUT_FlagBatterType varchar(100) = ''
				,@OUT_OutBatterType varchar(100) = ''
		BEGIN TRY	
		
          SELECT @Operation = t.SERVICEREQUEST.value('Oper[1]','varchar(10)'),
		  
		  @Matchid = t.SERVICEREQUEST.value('Matchid[1]','int'),
		  @MatchInningid = t.SERVICEREQUEST.value('MatchInningid[1]','int'),
		  @MatchTeamAid_undo = t.SERVICEREQUEST.value('MatchTeamAid_undo[1]','int')

          FROM @Inputstring.nodes('/SERVICEREQUEST') as t(SERVICEREQUEST)
		  DELETE FROM DeveloperError 
		  INSERT INTO DeveloperError values (@Inputstring,'7043762211')

		  IF EXISTS (SELECT MatchTeamAid FROM MatchTeamA where MatchTeamAid = @MatchTeamAid_undo)
		  BEGIN
			SELECT @MatchTeamAid_undo = ISNULL(MatchTeamAid_undo,0) FROM MatchTeamA where MatchTeamAid = @MatchTeamAid_undo
		  END
		  ELSE 
		  BEGIN
			SELECT @MatchTeamAid_undo = 0
		  END

		  IF(@Operation = 'UNDO')
		  BEGIN 
			
			IF(@MatchTeamAid_undo = 0)
			BEGIN 
				--SELECT * FROM MatchInning where Matchid = @Matchid


				SELECT 
				@Streakerid = Streakerid
				,@StickerPlayerid = StickerPlayerid
				,@StreakeName = StreakeName
				,@RunnerPlayerid = RunnerPlayerid
				,@Runnerid = Runnerid
				,@RunnerName = RunnerName
				,@BowlerPlayerid = BowlerPlayerid
				,@Bowlerid = Bowlerid
				,@BowlerName = BowlerName
				,@TotalOver = NoOfOver
				,@TeamABatterName = TeamAName
				 FROM Match 
				 where Matchid = @Matchid
				 

				 --update Match set 
				 --Streaker = @StreakeName
				 --,Runner = @RunnerName
				 --where Matchid = @Matchid

				 update MatchInning set 
				 Streakerid = @Streakerid
				,StreakeName = @StreakeName
				,RunnerPlayerid = @RunnerPlayerid
				,Runnerid = @Runnerid
				,RunnerName = @RunnerName
				,BowlerPlayerid = @BowlerPlayerid
				,Bowlerid = @Bowlerid
				,BowlerName = @BowlerName
				,Run = @Run
				,Out = @Out
				,Ball = @Ball
				,TotalOver = @TotalOver
				,Description = @TeamABatterName + ' won the toss and elected to bat.'
				,StickerRun = @StickerRun
				,StickerBall = @StickerBall
				,RunnerBall = @RunnerBall
				,RunnerRun = @RunnerRun
				,BowlerImage = @BowlingSide
				,BowlerWiseBallCount = @BowlerWiseBallCount
				,BowlerMaidan = @BowlerMaidan
				,BowlerRun = @BowlerRun
				,BowlerOut = @BowlerOut
				,BowlerRunDisplay = @BowlerRunDisplay
				where Matchid = @Matchid



				DELETE FROM MatchTeamA where Matchid = @Matchid
				DELETE FROM MatchTeamA_ScoreBoard where Matchid = @Matchid and Orderid NOT IN (1,2,3)

				SELECT @Description =  @TeamABatterName + ' won the toss and elected to bat.'

				update Match set Streaker = @StreakeName , Runner = @RunnerName,FlagBatter = 'Sticker',Description = @TeamABatterName + ' is batting.'  where Matchid = @Matchid

				Set @StickerColor = '#DC6933'
				Set @Non_StickerColor = 'white'
				select @MatchTeamAid_undo = 0

				select @Success = 1
			END
			ELSE
			BEGIN 

				DECLARE @Type varchar(100) = '',@Sticker_Run int = 0,@calculate_Run int = 0,@OLD_StreakeName varchar(500) = '',@OUT_Type varchar(100) = '',@OLD_FlagBatterType varchar(200) = '',@TEM_BowleOver int,@TEM_Bowle decimal(18,1)
				SELECT @Type = Type,@calculate_Run = Run,@OLD_StreakeName = StreakeName , @OLD_FlagBatterType = FlagBatterType FROM MatchTeamA where Matchid = @Matchid and MatchTeamAid_undo = @MatchTeamAid_undo
				SELECT @MatchTeamAid = MatchTeamAid FROM MatchTeamA Where MatchTeamAid_undo = @MatchTeamAid_undo and Type NOT IN ('Add_bowler')
				SELECT @OUT_Type = Type  FROM MatchTeamA where Matchid = @Matchid and MatchTeamAid = @MatchTeamAid_undo

				DECLARE @OUT_Streakerid int, @OUT_StickerPlayerid int ,@OUT_StreakeName varchar(100),@OUT_StickerRun int ,@OUT_StickerBall int 
				,@OUT_Runnerid int,@OUT_RunnerPlayerid int ,@OUT_RunnerName varchar(100),@OUT_RunnerRun int ,@OUT_RunnerBall int 




				If(@Type IN ('Out') OR @OUT_Type IN ('Out'))
				BEGIN
					SELECT 
					 @OUT_Streakerid = Streakerid
					,@OUT_StickerPlayerid = StickerPlayerid
					,@OUT_StreakeName = StreakeName
					,@OUT_Runnerid = Runnerid
					,@OUT_RunnerPlayerid = RunnerPlayerid
					,@OUT_RunnerName = RunnerName
					,@OUT_FlagBatterType = FlagBatterType
					,@OUT_OutBatterType = OutBatterType
					FROM MatchTeamA where Matchid = @Matchid and MatchTeamAid_undo = @MatchTeamAid_undo


					IF(@OUT_FlagBatterType = 'Sticker')
					BEGIN
						update Match set 
						Streaker = @OUT_StreakeName
						where Matchid = @Matchid

						update MatchTeamAPlayer set OutFlag = 0 where MatchTeamAPlayerid = @OUT_Streakerid
					END
					ELSE 
					BEGIn
						update Match set 
						Runner = @OUT_StreakeName
						where Matchid = @Matchid

						update MatchTeamAPlayer set OutFlag = 0 where MatchTeamAPlayerid = @OUT_Streakerid
					END

					

				END

				


				DELETE FROM MatchTeamA where MatchTeamAid_undo = @MatchTeamAid_undo
				DELETE FROM MatchTeamA_ScoreBoard where MatchTeamAPlayerid = @MatchTeamAid and Matchid = @Matchid
				--DELETE FROM MatchTeamA where MatchTeamAid = @MatchTeamAid
				--DELETE FROM MatchTeamA_ScoreBoard where MatchTeamAPlayerid = @MatchTeamAid and Matchid = @Matchid

				/*----------------------------- Description Update -----------------------------*/
				SELECT @TEM_BowleOver = BowleOver,@TEM_Bowle = Bowle  FROM MatchTeamA where Matchid = @Matchid and MatchTeamAid = @MatchTeamAid_undo
				IF(@TEM_BowleOver >= 2)
				BEGIN
					DECLARE @TEMPCRR decimal(18,2)
					,@TEMPTOTALRUN int
					,@TEMPProjectScore int
					,@TEMP_TotalOver int

					SELECT @TEMPTOTALRUN = SUM(Run) FROM MatchTeamA where Matchid = @Matchid
					SELECT @TEMP_TotalOver = NoOfOver FROM Match where Matchid = @Matchid 
					SELECT @TEMPCRR = @TEMPTOTALRUN / @TEM_Bowle
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
				DECLARE @TEMP_TeamBName varchar(100)
					 SELECT @TEMP_TeamBName = TeamAName FROM Match where Matchid = @Matchid
					SELECT @Description = @TEMP_TeamBName + ' won the toss and elected to bat.'
				END


				update Match set Description = @Description where Matchid = @Matchid 
				update MatchInning set Description = @Description where Matchid = @Matchid
				/*----------------------------- Description Update -----------------------------*/

				SELECT 
				@BowlerPlayerid = BowlerPlayerid
				,@Bowlerid = Bowlerid
				,@BowlerName = BowlerName
				,@BowlingSide = BowlingSide
				,@StickerPlayerid = StickerPlayerid
				,@Streakerid = Streakerid
				,@StreakeName = StreakeName
				,@RunnerPlayerid = RunnerPlayerid
				,@Runnerid = Runnerid
				,@RunnerName = RunnerName
				--,@Ball = Bowle
				--,@BowlerWiseBallCount = BowlerWiseBallCount
				,@BowleCount = BowleCount
				,@BowleOver = BowleOver
				,@TotalOver = TotalOver
				,@TeamABatterName = TeamAName
				
				,@Sticker_Run = Run
				 FROM MatchTeamA 
				 where Matchid = @Matchid and MatchTeamAid = @MatchTeamAid_undo

				 --UPDATE Match set 
				 --Streaker = @StreakeName
				 --,Runner = @RunnerName
				 --where Matchid = @Matchid

				 SELECT @Run = ISNULL(SUM(Run),0) FROM MatchTeamA where Matchid = @Matchid
				 SELECT @Out = ISNULL(COUNT(1),0) FROM MatchTeamA where Matchid = @Matchid and Type = 'Out'
				 SELECT @StickerRun = ISNULL(SUM(Run),0) FROM MatchTeamA where Matchid = @Matchid and Streakerid = @Streakerid and Type = 'Main'
				 SELECT @StickerBall = ISNULL(COUNT(1),0) FROM MatchTeamA where Matchid = @Matchid and Streakerid = @Streakerid and Type IN ('Main','NoBall','ByeBall','LegByeBall')
				 SELECT @RunnerRun = ISNULL(SUM(Run),0) FROM MatchTeamA where Matchid = @Matchid and Streakerid = @Runnerid and Type = 'Main'
				 SELECT @RunnerBall = ISNULL(COUNT(1),0) FROM MatchTeamA where Matchid = @Matchid and Streakerid = @Runnerid and Type IN ('Main','NoBall','ByeBall','LegByeBall')
				 SELECT @BowlerRun = ISNULL(SUM(Run),0) FROM MatchTeamA where Matchid = @Matchid and Bowlerid = @Bowlerid
				 SELECT @BowlerOut = ISNULL(COUNT(1),0) FROM MatchTeamA where Matchid = @Matchid and Type = 'Out' and Bowlerid = @Bowlerid
				 --AND OutDeliveryType IS NULL
				 --OR OutDeliveryType NOT IN ('WideBall','NoBall','ByeBall','LegByeBall')
				AND (
				OutBatterType NOT IN ('RunOut','Hit_TheBallTwisce') OR OutBatterType IN ('Hit_Wicket') OR OutDeliveryType NOT IN ('WideBall','NoBall') 
				)

				 SELECT @BowlerWiseBallCount = ISNULL(Max(BowlerWiseBallCount),0) FROM MatchTeamA where Matchid = @Matchid and Bowlerid = @Bowlerid and Type IN ('Main','OUT') AND BowleOver = @BowleOver
				 SELECT @Ball = ISNULL(Max(Bowle),0) FROM MatchTeamA where Matchid = @Matchid and Type IN ('Main','OUT') 
				
				SELECT * 
				INTO #TEMP_MAIDANCALCULATE FROM (
				SELECT BOWLEOVER,SUM(RUN) AS RUN FROM MATCHTEAMA WHERE MATCHID = @MATCHID AND @Matchid = @Bowlerid
				GROUP BY BOWLEOVER 
				) A1
				SELECT @BowlerMaidan = ISNULL(COUNT(1),'0') FROM #TEMP_MAIDANCALCULATE  WHERE RUN = 0
				DROP TABLE #TEMP_MAIDANCALCULATE
				
				
				SELECt @BowlerRunDisplay = ISNULL(STUFF ((
					SELECT '- ' + 
					CASE 
						WHEN OutBatterType = 'Retired' THEN ' ( OTH )' 
						WHEN MT.Type = 'Main' THEN CAST(MT.Run as varchar(10)) 
						WHEN MT.Type = 'RunningScored' THEN CAST(MT.Run as varchar(10)) 
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

				
				Set @StickerColor = '#DC6933'
				Set @Non_StickerColor = 'white'

				declare @Streaker varchar(100)
				,@Runner varchar(100)

				SELECT @Streaker = Streaker,@Runner = Runner FROM match where Matchid = @Matchid
				
				DECLARE 
				@T_Streakerid int
				,@T_StickerPlayerid int
				,@T_StreakeName varchar(100) = ''
				,@T_RunnerPlayerid int
				,@T_Runnerid int
				,@T_RunnerName varchar(100) = ''
				,@T_StickerRun int
				,@T_StickerBall int
				,@T_RunnerBall int
				,@T_RunnerRun int

				--set @T_StreakeName = @StreakeName
				--set @T_RunnerName  = @RunnerName 

				set @T_Streakerid = @Streakerid
				set @T_StickerPlayerid = @StickerPlayerid
				set @T_StreakeName = @StreakeName
				set @T_RunnerPlayerid = @RunnerPlayerid
				set @T_Runnerid = @Runnerid
				set @T_RunnerName = @RunnerName
				set @T_StickerRun = @StickerRun
				set @T_StickerBall = @StickerBall
				set @T_RunnerBall  = @RunnerBall
				set @T_RunnerRun = @RunnerRun

				--If(@Type IN ('Out'))
				--BEGIN
				--	DECLARE @OUTRUN int = 0
				--	SELECT @OUTRUN = Run FROM MatchTeamA where Matchid = @Matchid and MatchTeamAid = @MatchTeamAid_undo
					
				--	IF(@OUTRUN % 2 = 0)
				--	BEGIN
				--		update Match set Streaker = @OLD_StreakeName where Matchid = @Matchid
				--	END
				--	ELSE
				--	BEGIN
				--		update Match set Runner = @OLD_StreakeName where Matchid = @Matchid
				--	END

				--END

				IF(@Type IN ('Main','ByeBall','LegByeBall','Out'))
				BEGIN

						IF(@calculate_Run % 2 != 0)
						BEGIN
							IF(@Streaker = @StreakeName)
							BEGIN

								set @Streakerid = @T_Streakerid
								set @StickerPlayerid = @T_StickerPlayerid
								set	@StreakeName = @T_StreakeName
								set	@StickerRun = @T_StickerRun
								set	@StickerBall = @T_StickerBall
					
								set @Runnerid = @T_Runnerid
								set @RunnerPlayerid = @T_RunnerPlayerid
								set	@RunnerName = @T_RunnerName
								set @RunnerBall = @T_RunnerBall
								set @RunnerRun = @T_RunnerRun

								if(@Streaker = @OLD_StreakeName)
								BEGIN
									Set @StickerColor = '#DC6933'
									Set @Non_StickerColor = 'white'
									
								END
								ELSE 
								BEGIN
									Set @StickerColor = 'white'
									Set @Non_StickerColor = '#DC6933'
								END

								SELECT @OLD_StreakeName = @Streaker +' \ '+ @StreakeName +' / Main ,ByeBall ,LegByeBall / NAME -if'
							END
							ELSE 
							BEGIN
								SELECT @OLD_StreakeName = @Streaker +' \ '+ @StreakeName  +' / Main ,ByeBall ,LegByeBall / NAME -ELSE'	

								set @Streakerid = @T_Runnerid
								set @StickerPlayerid = @T_RunnerPlayerid
								set	@StreakeName = @T_RunnerName
								set	@StickerRun = @T_RunnerRun
								set	@StickerBall = @T_RunnerBall
					
								set @Runnerid = @T_Streakerid
								set @RunnerPlayerid = @T_StickerPlayerid
								set	@RunnerName = @T_StreakeName
								set @RunnerBall = @T_StickerBall
								set @RunnerRun = @T_StickerRun
								Set @StickerColor = '#DC6933'
								Set @Non_StickerColor = 'white'
								

								
							END
						END
						ELSE 
						BEGIN 
							IF(@Type IN('Main'))
							BEGIN
								set @Streakerid = @T_Streakerid
								set @StickerPlayerid = @T_StickerPlayerid
								set	@StreakeName = @T_StreakeName
								set	@StickerRun = @T_StickerRun
								set	@StickerBall = @T_StickerBall
					
								set @Runnerid = @T_Runnerid
								set @RunnerPlayerid = @T_RunnerPlayerid
								set	@RunnerName = @T_RunnerName
								set @RunnerBall = @T_RunnerBall
								set @RunnerRun = @T_RunnerRun

								IF(@calculate_Run % 2 != 0)
								BEGIN
									Set @StickerColor = '#DC6933'
									Set @Non_StickerColor = 'white'
								END
								ELSE 
								BEGIN
									Set @StickerColor = '#DC6933'
									Set @Non_StickerColor = 'white'
								END

								SELECT @OLD_StreakeName = @OLD_StreakeName +' /Main ,ByeBall ,LegByeBall / 2 -if'
							END
							ELSE 
							BEGIN 
								set @Streakerid = @T_Runnerid
								set @StickerPlayerid = @T_RunnerPlayerid
								set	@StreakeName = @T_RunnerName
								set	@StickerRun = @T_RunnerRun
								set	@StickerBall = @T_RunnerBall
					
								set @Runnerid = @T_Streakerid
								set @RunnerPlayerid = @T_StickerPlayerid
								set	@RunnerName = @T_StreakeName
								set @RunnerBall = @T_StickerBall
								set @RunnerRun = @T_StickerRun

								Set @StickerColor = 'white'
								Set @Non_StickerColor = '#DC6933'

								
								SELECT @OLD_StreakeName = @OLD_StreakeName +' /Main ,ByeBall ,LegByeBall / 2 -else'
							END
						END
				  END
				  ELSE IF(@Type IN ('WideBall','NoBall'))
				  BEGIN
					IF(@calculate_Run % 2 != 0)
					BEGIN

						set @Streakerid = @T_Streakerid
						set @StickerPlayerid = @T_StickerPlayerid
						set	@StreakeName = @T_StreakeName
						set	@StickerRun = @T_StickerRun
						set	@StickerBall = @T_StickerBall
					
						set @Runnerid = @T_Runnerid
						set @RunnerPlayerid = @T_RunnerPlayerid
						set	@RunnerName = @T_RunnerName
						set @RunnerBall = @T_RunnerBall
						set @RunnerRun = @T_RunnerRun
						
						Set @StickerColor = '#DC6933'
						Set @Non_StickerColor = 'white'
						SELECT @OLD_StreakeName = @OLD_StreakeName +' /WideBall ,NoBall -ELSE IF'
						
					END
					ELSE 
					BEGIN 
						set @Streakerid = @T_Streakerid
						set @StickerPlayerid = @T_StickerPlayerid
						set	@StreakeName = @T_StreakeName
						set	@StickerRun = @T_StickerRun
						set	@StickerBall = @T_StickerBall
					
						set @Runnerid = @T_Runnerid
						set @RunnerPlayerid = @T_RunnerPlayerid
						set	@RunnerName = @T_RunnerName
						set @RunnerBall = @T_RunnerBall
						set @RunnerRun = @T_RunnerRun
						
						Set @StickerColor = 'white'
						Set @Non_StickerColor = '#DC6933'
						--set @Streakerid = @T_Runnerid
						--set @StickerPlayerid = @T_RunnerPlayerid
						--set	@StreakeName = @T_RunnerName
						--set	@StickerRun = @T_RunnerRun
						--set	@StickerBall = @T_RunnerBall
					
						--set @Runnerid = @T_Streakerid
						--set @RunnerPlayerid = @T_StickerPlayerid
						--set	@RunnerName = @T_StreakeName
						--set @RunnerBall = @T_StickerBall
						--set @RunnerRun = @T_StickerRun
						
						--Set @StickerColor = 'white'
						--Set @Non_StickerColor = '#DC6933'
						SELECT @OLD_StreakeName = @OLD_StreakeName +' /WideBall ,NoBall -ELSE ELSE'
						
					END
				END
				

				If(@Type IN ('Out') OR @OUT_Type IN ('Out'))
				BEGIN

					SELECT @Streakerid = @OUT_Streakerid;
					SELECT @StickerPlayerid = @OUT_StickerPlayerid;
					SELECT @StreakeName = @OUT_StreakeName;
					
					SELECT @Runnerid = @OUT_Runnerid;
					SELECT @RunnerPlayerid = @OUT_RunnerPlayerid;
					SELECT @RunnerName = @OUT_RunnerName;
					
					
					SELECT @StickerRun = ISNULL(SUM(Run),0) FROM MatchTeamA where Matchid = @Matchid and Streakerid = @OUT_Streakerid and Type = 'Main'
					SELECT @StickerBall = ISNULL(COUNT(1),0) FROM MatchTeamA where Matchid = @Matchid and Streakerid = @OUT_Streakerid and Type IN ('Main','NoBall','ByeBall','LegByeBall')
					SELECT @RunnerRun = ISNULL(SUM(Run),0) FROM MatchTeamA where Matchid = @Matchid and Streakerid = @OUT_Runnerid and Type = 'Main'
					SELECT @RunnerBall = ISNULL(COUNT(1),0) FROM MatchTeamA where Matchid = @Matchid and Streakerid = @OUT_Runnerid and Type IN ('Main','NoBall','ByeBall','LegByeBall')

					SELECT @OUT_StickerRun = ISNULL(SUM(Run),0) FROM MatchTeamA where Matchid = @Matchid and Streakerid = @OUT_Streakerid and Type = 'Main'
					SELECT @OUT_StickerBall = ISNULL(COUNT(1),0) FROM MatchTeamA where Matchid = @Matchid and Streakerid = @OUT_Streakerid and Type IN ('Main','NoBall','ByeBall','LegByeBall')
					SELECT @OUT_RunnerRun = ISNULL(SUM(Run),0) FROM MatchTeamA where Matchid = @Matchid and Streakerid = @OUT_Runnerid and Type = 'Main'
					SELECT @OUT_RunnerBall = ISNULL(COUNT(1),0) FROM MatchTeamA where Matchid = @Matchid and Streakerid = @OUT_Runnerid and Type IN ('Main','NoBall','ByeBall','LegByeBall')


					update MatchTeamAPlayer set OutFlag = 0 where MatchTeamAPlayerid = @Streakerid

					IF(@OUT_FlagBatterType = 'Sticker')
					BEGIN
						Set @StickerColor = '#DC6933'
						Set @Non_StickerColor = 'white'
					END
					ELSE 
					BEGIN
						Set @StickerColor = 'white'
						Set @Non_StickerColor = '#DC6933'
					END

					

				END


				update Match set FlagBatter = @OLD_FlagBatterType where Matchid  = @Matchid 

				update MatchInning set 
				 Streakerid = @Streakerid
				,StickerPlayerid = @StickerPlayerid
				,StreakeName = @StreakeName
				,RunnerPlayerid = @RunnerPlayerid
				,Runnerid = @Runnerid
				,RunnerName = @RunnerName
				,BowlerPlayerid = @BowlerPlayerid
				,Bowlerid = @Bowlerid
				,BowlerName = @BowlerName
				,Run = @Run
				,Out = @Out
				,Ball = @Ball
				,TotalOver = @TotalOver
				,Description = @Description
				,StickerRun = @StickerRun
				,StickerBall = @StickerBall
				,RunnerBall = @RunnerBall
				,RunnerRun = @RunnerRun
				,BowlerImage = @BowlingSide
				,BowlerWiseBallCount = @BowlerWiseBallCount
				,BowlerMaidan = @BowlerMaidan
				,BowlerRun = @BowlerRun
				,BowlerOut = @BowlerOut
				,BowlerRunDisplay = @BowlerRunDisplay
				where Matchid = @Matchid




				If(@Type IN ('Out') OR @OUT_Type IN ('Out'))
				BEGIN
					DECLARE @TEMP_Streaker varchar(100)
							,@TEMP_Runner varchar(100)
				
					SELECT @TEMP_Streaker = Streaker,
					@TEMP_Runner = Runner FROM Match where Matchid = @Matchid

					IF @TEMP_Streaker = @OUT_StreakeName
					BEGIN 
						SET @Streakerid = @OUT_Streakerid
						SET @StickerPlayerid = @OUT_StickerPlayerid
						SET @StreakeName = @OUT_StreakeName
						SET @StickerRun = @OUT_StickerRun
						SET @StickerBall = @OUT_StickerBall

						SET @Runnerid = @OUT_Runnerid
						SET @RunnerPlayerid = @OUT_RunnerPlayerid
						SET @RunnerName = @OUT_RunnerName
						SET @RunnerRun = @OUT_RunnerRun
						SET @RunnerBall = @OUT_RunnerBall
					END
					ELSE 
					BEGIN
						SET @Streakerid = @OUT_Runnerid
						SET @StickerPlayerid = @OUT_RunnerPlayerid
						SET @StreakeName = @OUT_RunnerName
						SET @StickerRun = @OUT_RunnerRun
						SET @StickerBall = @OUT_RunnerBall

						SET @Runnerid = @OUT_Streakerid
						SET @RunnerPlayerid = @OUT_StickerPlayerid
						SET @RunnerName = @OUT_StreakeName
						SET @RunnerRun = @OUT_StickerRun
						SET @RunnerBall = @OUT_StickerBall
					END

				END

				select @Success = 1
			END

		  END

		  IF(@Success = 1)
			BEGIN
				SELECT @ResponseXml = '<SERVICERESPONSE><RESPONSECODE>0</RESPONSECODE>'+
				
				'<OLD_STREAKENAME>'+ISNULL(CAST(@OLD_StreakeName as varchar(100)),0)+'</OLD_STREAKENAME>'+
				'<CALCULATE_RUN>'+ISNULL(CAST(@calculate_Run as varchar(100)),0)+'</CALCULATE_RUN>'+
				'<TYPE>'+ISNULL(CAST(@Type as varchar(100)),0)+'</TYPE>'+
				'<STICKERCOLOR>'+ISNULL(CAST(@StickerColor as varchar(100)),0)+'</STICKERCOLOR>'+
				'<NON_STICKERCOLOR>'+ISNULL(CAST(@Non_StickerColor as varchar(100)),0)+'</NON_STICKERCOLOR>'+
				'<RUN>'+ISNULL(CAST(@Run as varchar(100)),0)+'</RUN>'+
				'<OUT>'+ISNULL(CAST(@Out as varchar(100)),0)+'</OUT>'+
				'<BALL>'+ISNULL(CAST(@Ball as varchar(100)),0)+'</BALL>'+
				'<TOTALOVER>'+ISNULL(CAST(@TotalOver as varchar(100)),0)+'</TOTALOVER>'+
				'<TEAMABATTERNAME>'+ISNULL(CAST(@TeamABatterName as varchar(100)),0)+'</TEAMABATTERNAME>'+
				'<STREAKERID>'+ISNULL(CAST(@Streakerid as varchar(100)),0)+'</STREAKERID>'+
				'<STICKERPLAYERID>'+ISNULL(CAST(@StickerPlayerid as varchar(100)),0)+'</STICKERPLAYERID>'+
				'<STREAKENAME>'+ISNULL(CAST(@StreakeName as varchar(100)),0)+'</STREAKENAME>'+
				'<STICKERRUN>'+ISNULL(CAST(@StickerRun as varchar(100)),0)+'</STICKERRUN>'+
				'<STICKERBALL>'+ISNULL(CAST(@StickerBall as varchar(100)),0)+'</STICKERBALL>'+
				'<RUNNERPLAYERID>'+ISNULL(CAST(@RunnerPlayerid as varchar(100)),0)+'</RUNNERPLAYERID>'+
				'<RUNNERID>'+ISNULL(CAST(@Runnerid as varchar(100)),0)+'</RUNNERID>'+
				'<RUNNERNAME>'+ISNULL(CAST(@RunnerName as varchar(100)),0)+'</RUNNERNAME>'+
				'<RUNNERBALL>'+ISNULL(CAST(@RunnerBall as varchar(100)),0)+'</RUNNERBALL>'+
				'<RUNNERRUN>'+ISNULL(CAST(@RunnerRun as varchar(100)),0)+'</RUNNERRUN>'+
				'<BOWLERPLAYERID>'+ISNULL(CAST(@BowlerPlayerid as varchar(100)),0)+'</BOWLERPLAYERID>'+
				'<BOWLERID>'+ISNULL(CAST(@Bowlerid as varchar(100)),0)+'</BOWLERID>'+
				'<BOWLERNAME>'+ISNULL(CAST(@BowlerName as varchar(100)),0)+'</BOWLERNAME>'+
				'<BOWLECOUNT>'+ISNULL(CAST(@BowleCount as varchar(100)),0)+'</BOWLECOUNT>'+
				'<BOWLEOVER>'+ISNULL(CAST(@BowleOver as varchar(100)),0)+'</BOWLEOVER>'+
				'<BOWLINGSIDE>'+ISNULL(CAST(@BowlingSide as varchar(100)),0)+'</BOWLINGSIDE>'+
				'<BOWLERWISEBALLCOUNT>'+ISNULL(CAST(@BowlerWiseBallCount as varchar(100)),0)+'</BOWLERWISEBALLCOUNT>'+
				'<BOWLERMAIDAN>'+ISNULL(CAST(@BowlerMaidan as varchar(100)),0)+'</BOWLERMAIDAN>'+
				'<BOWLERRUN>'+ISNULL(CAST(@BowlerRun as varchar(100)),0)+'</BOWLERRUN>'+
				'<BOWLEROUT>'+ISNULL(CAST(@BowlerOut as varchar(100)),0)+'</BOWLEROUT>'+
				'<BOWLERRUNDISPLAY>'+ISNULL(CAST(@BowlerRunDisplay as varchar(100)),0)+'</BOWLERRUNDISPLAY>'+
				'<MATCHTEAMAID_UNDO>'+ISNULL(CAST(@MatchTeamAid_undo as varchar(100)),0)+'</MATCHTEAMAID_UNDO>'+
				'<TEAMDESCRIPTION>'+ISNULL(CAST(@Description as varchar(max)),0)+'</TEAMDESCRIPTION>'+
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



