package com.iksgmbh.fileman.backend.dao;

import java.util.Date;

import org.springframework.stereotype.Component;
import com.iksgmbh.fileman.backend.FileContentData;

/**
 * Created as draft by MOGLiCC.
 * Adapt freely if you need.
 *
**/
@Component
public class FileContentDataDaoImpl extends FileContentDataDao
{
	static int counter = 0;
	
	static private final String IMAGE = "/9j/4AAQSkZJRgABAQEAkACQAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAiACEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9+JGEQ6fkK8t+PH7bfwr/AGY9S0uy8deN9F8O32tQy3FlbTu0k1xFGyq8gSNWbYrOoLEYywGc1wn/AAVxYj/gnZ8UkDuq3GmRW8oRyu+OS6gSRCQQcMjMpHcMR3rwTwvafCf9kb/gpF49b4Z+CNB8NDwd8I7u71/TtIsYPDsN5KmqW8kQNzc+RaN+7YjzTL5ce4hnWgD3e5/4K/8A7NtjCZbn4ueGLK3THmT3QnghiBOMvI8QVF55LEAdzX0Xp2qwataRz28qTwzIskckbBkkVhkMCOCCCCCOoNfmn+15/wAFKtJ/am/Zp8ZfD5vCUejnxTpzWaXj/FTwHdR277ldS8J1tRIm5AGTI3KWGRnNepf8EpLHx38HfiX4u+G3iLXfC+qeErjwtofj/wAL6Zodm8Vp4Si1SfUI5tLt5Dd3SyWiPZ+ZEElaOMSskR8kRqoB9xbv85opNtFAHzh/wVz/AOUeHxN/68rb/wBLbevnnWPDet+Iv+CsPx1sNKtNYfUdR+E88WmgtfWYuJDfWqgQTaolxp/3urWkDQKx/exu+a+t/wBvT4G6z+0l+yT448FeHptNt9c1ywVLBtQkeO1aZJY5VWR0VmRWMe0sFbbuzg4xXzF8d/hP+178QfjvpPxF8DeHfhR4B8Q2GhXHhy5W48XNrtte2ktzHdD5H02ExyLJH94MQQ3QYBoA8/b9kH9oHn/infGXT/oefBH/AMzFfSv7N2l3uift6+ILLUklj1G0+DHg6C6SWaGZ0lXUddVwzwxxROdwOWjjjQ9VRRhR5H4c+H//AAUM1TxJp1vqXjP4G6Npk13Et9erpn26S1tt48144BHH5kgTdsUyKC23JAzX0h+zX+zB4o+Gnxh8U+PPHPxAHjzxL4h0fT9Aje38PQ6JbWVnZzXk6ARpLKXkaS9ly5YDAUBeCSAe6bqKbz70UADdTSDpRRQAoPNL6UUUANooooA//9k=";
	
	public FileContentDataDaoImpl() {
		fileContentDatas.add(createDataset("readme.txt", "bla", 123L, "ich", "10.10.2000"));
		fileContentDatas.add(createDataset("logo.gif", IMAGE, 123L, "ich", "10.10.2000"));
		fileContentDatas.add(createDataset("script.groovy", "do it", 123L, "ich", "10.10.2000"));
	}

	private FileContentData createDataset(
  			String name,
  			String content,
  			Long size,
  			String creator,
  			String creationDate)
	{
		counter++;
		FileContentData toReturn = new FileContentData();
		toReturn.setUuid((long)counter);
		toReturn.setName(name);
		toReturn.setContent(content);
		toReturn.setSize(size);
		toReturn.setCreator(creator);
		toReturn.setCreationDate(creationDate);
		return toReturn;
	}
	
	@Override
	public FileContentData create(FileContentData fileContentData) {
		Date now = new Date();
		fileContentData.setUuid(now.getTime());
		fileContentData.setCreationDate(now.toLocaleString());
		return super.create(fileContentData);
	}

}