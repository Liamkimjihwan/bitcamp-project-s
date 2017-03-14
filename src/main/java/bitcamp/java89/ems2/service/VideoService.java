package bitcamp.java89.ems2.service;

import java.util.List;

import bitcamp.java89.ems2.domain.Member;
import bitcamp.java89.ems2.domain.Video;

public interface VideoService {
  int getSize() throws Exception;
  List<Video> getList(int pageNo, int pageSize) throws Exception;
  List<Member> selectName() throws Exception;
  /*Student getDetail(int no) throws Exception;
  int add(Student student) throws Exception;
  int delete(int no) throws Exception;
  int update(Student student) throws Exception;*/
//  int getSize() throws Exception;
}
















