package bitcamp.java89.ems2.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import bitcamp.java89.ems2.domain.Message;

public interface MessageDao {
  int menteeSendQnA(Message message) throws Exception; 
  int menteeSendMesg(Message message) throws Exception; 
  int mentoSendMesg(Message message) throws Exception;
  String getMessageNo(HashMap<String, Object> intMap) throws Exception;
  ArrayList<Integer> getMenteeNo(HashMap<String, Object> intMap) throws Exception;
  String mentoGetMessageNo(HashMap<String, Object> intMap) throws Exception;
  Message nodeGetMessageNo(HashMap<String, Object> intMap) throws Exception;
  Message getMessageWriter(HashMap<String, Object> intMap) throws Exception;
  int newMsgCount(HashMap<String, Object> intMap) throws Exception;
  int nodeNewMsgCount(HashMap<String, Object> intMap) throws Exception;
  int menteeNewMsgCount(HashMap<String, Object> intMap) throws Exception;
  int hasQnA(Message message) throws Exception;
  int isMsg(HashMap<String, Object> targetMento) throws Exception;
  ArrayList<Message> messageList(Map<String,Object> paramMap) throws Exception; 
  int menteeVisit(Message message) throws Exception;
  int mentoVisit(Message message) throws Exception;
  List<Integer> conoList(int sno) throws Exception;
  ArrayList<Message> mentoInfo(HashMap<String, Object> targetMento) throws Exception;
  Message mentoGetOne(HashMap<String, Object> targetMento) throws Exception;
  
}
